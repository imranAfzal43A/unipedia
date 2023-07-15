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
  InterstitialAd,
  AdEventType,
  TestIds,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { StatusBar } from "expo-status-bar";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-5120759618248888/9392760660";
const adUnitIdBanner = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-5120759618248888/6385972308";
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});

export default function Unipedia() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );
    interstitial.load();
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (loaded) {
      interstitial.show();
      setLoaded(false);
    }
  }, [loaded]);
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
      <View style={{ marginTop: 30, margin: 10, padding: 10 }}>
        <Text style={{ fontSize: 18, fontFamily: "RM", margin: 2 }}>
          List of Universites
        </Text>
        {!loading ? (
          <FlatList data={universities} renderItem={renderItem} />
        ) : (
          <ActivityIndicator size={"large"} color={"#CB61C5"} />
        )}
      </View>
      <View style={{ position: "absolute", bottom: 2 }}>
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
