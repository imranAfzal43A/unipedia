import { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import UniCard from "../components/uniCard";
import { useNavigation } from "@react-navigation/native";
import { firestoreDB } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {

  TestIds,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import style from "../components/styles";

// const adUnitId = __DEV__
//   ? TestIds.INTERSTITIAL
//   : "ca-app-pub-5120759618248888/9392760660";
const adUnitIdBanner = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-5120759618248888/2874363438";
// const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ["fashion", "clothing"],
// });

export default function Unipedia() {
  const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //     }
  //   );
  //   interstitial.load();
  //   return unsubscribe;
  // }, []);
  // useEffect(() => {
  //   if (loaded) {
  //     interstitial.show();
  //     setLoaded(false);
  //   }
  // }, [loaded]);
  const navigation = useNavigation();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUniversities = useCallback(async () => {
    try {
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
      }
      setLoading(false);
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
      <StatusBar backgroundColor="#fff" style="dark" />
      <View style={{ marginTop: 35 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "RM",
            margin: 2,
            alignSelf: "center",
          }}
        >
          List of Universites
        </Text>
        {/* {!loading ? (
          <FlatList data={universities} renderItem={renderItem} />
        ) : (
          <ActivityIndicator size={"large"} color={"#CB61C5"} />
        )} */}
        {!loading ? (
          <>
            {universities.length != 0 ? (
              <FlatList data={universities} renderItem={renderItem} />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialIcons name="error" size={40} color="#E367A6" />
                <Text style={[style.textStyle, { fontSize: 18 }]}>
                  Sorry ! something went wrong.
                </Text>
              </View>
            )}
          </>
        ) : (
          <ActivityIndicator size={"large"} color={"#E367A6"} />
        )}
      </View>
      <View style={{ position: "absolute", bottom: 50 }}>
        <BannerAd
          unitId={adUnitIdBanner}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
