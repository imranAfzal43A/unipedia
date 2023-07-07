import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import style from "../components/styles";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import SepratorLine from "../components/sepratorLine";
import DepartmentCard from "../components/departmentCard";
import SelectSemester from "../components/semesterModel";
import { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
export default function DepartmentsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDepart, setSelectedDepart] = useState("");
  const [selectedDepartID, setSelectedDepartID] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const CACHE_KEY = "departmentsCache";
  const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  const getDepartments = useCallback(async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const currentTime = new Date().getTime();

        if (currentTime - timestamp < CACHE_EXPIRATION) {
          console.log("Using cached data");
          setDepartments(data);
          setLoading(false);
          return;
        }
      }

      const docRef = doc(firestoreDB, "data", route.params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const departments = docSnap.data().departments;
        console.log("Fetched data:", departments);
        setDepartments(departments);

        const cachedData = {
          data: departments,
          timestamp: new Date().getTime(),
        };

        AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
        setLoading(false);
      } else {
        setLoading(false);
        console.log("No such document!");
      }
    } catch (e) {
      setLoading(false);
      console.log("Error! Cannot get departments:", e);
    }
  }, []);
  console.log(departments);
  useEffect(() => {
    getDepartments();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <DepartmentCard
        deptName={item.name}
        onPress={() => {
          setModalVisible(true);
          setSelectedDepart(item.name);
          setSelectedDepartID(item.id);
        }}
      />
    );
  };
  return (
    <SafeAreaView style={style.settigsScreens}>
      <StatusBar style="auto" />
      <SelectSemester
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        Department={selectedDepart}
        onRequestClose={setModalVisible}
        DepartmentID={selectedDepartID}
      />
      <Text style={style.appBarTitle}>Departmants</Text>
      <TouchableOpacity
        style={style.backButton}
        onPress={() => navigation.goBack()}
      >
        <Entypo name={"chevron-left"} size={24} color="black" />
      </TouchableOpacity>
      <View style={{ justifyContent: "center", marginTop: 50 }}>
        {!loading ? (
          <FlatList data={departments} renderItem={renderItem} />
        ) : (
          <ActivityIndicator size={"large"} color={"#CB61C5"} />
        )}

        <SepratorLine />
      </View>
    </SafeAreaView>
  );
}
