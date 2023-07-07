import { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import style from "../components/styles";
import UniCard from "../components/uniCard";
import { useNavigation } from "@react-navigation/native";
import { firestoreDB } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Unipedia() {
  const navigation = useNavigation();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const CACHE_KEY = "universitiesCache";
  const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  const getUniversities = useCallback(async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const currentTime = new Date().getTime();

        if (currentTime - timestamp < CACHE_EXPIRATION) {
          console.log("Using cached data");
          setUniversities(data);
          setLoading(false);
          return;
        }
      }

      const querySnapshot = await getDocs(
        collection(firestoreDB, "universities")
      );
      const uniList = [];
      querySnapshot.forEach((doc) => {
        uniList.push(doc.data());
      });

      if (uniList.length > 0) {
        const universities = uniList[0].universities;
        console.log("Fetched data:", universities);
        setUniversities(universities);

        const cachedData = {
          data: universities,
          timestamp: new Date().getTime(),
        };
        setLoading(false);
        AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
      }
    } catch (e) {
      setLoading(false);
      console.log("Error! Cannot get universities:", e);
    }
  }, []);

  useEffect(() => {
    getUniversities();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <UniCard
        uniName={item.name}
        onPress={() => navigation.navigate("Departments", { id: item.id })}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ marginTop: 30, margin: 10, padding: 10 }}>
        <Text style={{ fontSize: 16, fontFamily: "RB" }}>
          List of Universites
        </Text>
        {!loading ? (
          <FlatList data={universities} renderItem={renderItem} />
        ) : (
          <ActivityIndicator size={"large"} color={"#CB61C5"} />
        )}
      </View>
    </SafeAreaView>
  );
}
