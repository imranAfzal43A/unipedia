import { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
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
import style from "../components/styles";
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

export default function NewsScreen() {
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
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUniversities = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestoreDB, "notifications")
      );
      const notiList = [];
      querySnapshot.forEach((doc) => {
        notiList.push(doc.data());
      });

      if (notiList.length > 0) {
        setUniversities(notiList);
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
    console.log(item);
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          borderWidth: 1,
          marginBottom: 4,
          borderRadius: 4,
          padding: 15,
          backgroundColor: "#CB61C5",
        }}
      >
        <Text style={[style.teacher]}>{item.title}</Text>
        <Text style={style.teacher}>{item.description}</Text>
        {item.image != "link" ? (
          <Image
            source={{ uri: item.image }}
            resizeMode="contain"
            style={{
              width: 220,
              height: 250,
              borderRadius: 5,
              alignSelf: "center",
            }}
          />
        ) : null}
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" style="dark" />
      <View style={{ marginTop: 30, margin: 10, padding: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "RM",
            margin: 2,
            alignSelf: "center",
          }}
        >
          News and Updates
        </Text>
      </View>
      <View style={{ padding: 10 }}>
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
