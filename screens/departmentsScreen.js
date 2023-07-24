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
import { StatusBar } from "expo-status-bar";
// import {
//   TestIds,
//   BannerAd,
//   BannerAdSize,
// } from "react-native-google-mobile-ads";

// const adUnitIdBanner = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-5120759618248888/6385972308";
export default function DepartmentsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDepart, setSelectedDepart] = useState("");
  const [selectedDepartID, setSelectedDepartID] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const getDepartments = useCallback(async () => {
    try {
      const docRef = doc(firestoreDB, "data", route.params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const departments = docSnap.data().departments;
        console.log("Fetched data:", departments);
        setDepartments(departments);

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
      <StatusBar backgroundColor="#fff" style="dark" />
      <SelectSemester
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        Department={selectedDepart}
        onRequestClose={setModalVisible}
        DepartmentID={selectedDepartID}
      />
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text style={[style.appBarTitle, { fontSize: 18 }]}>Departmants</Text>
        <TouchableOpacity
          style={style.backButton}
          onPress={() => navigation.goBack()}
        >
          <Entypo name={"chevron-left"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", marginTop: 60 }}>
        {!loading ? (
          <FlatList data={departments} renderItem={renderItem} />
        ) : (
          <ActivityIndicator size={"large"} color={"#CB61C5"} />
        )}

        <SepratorLine />
      </View>
      <View style={{ position: "absolute", bottom: 2 }}>
        {/* <BannerAd
          unitId={adUnitIdBanner}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        /> */}
      </View>
    </SafeAreaView>
  );
}
