import { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestoreDB } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
// import {
//   InterstitialAd,
//   AdEventType,
//   TestIds,
//   BannerAd,
//   BannerAdSize,
// } from "react-native-google-mobile-ads";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import style from "../components/styles";
import { Ionicons } from "@expo/vector-icons";

// const adUnitId = __DEV__
//   ? TestIds.INTERSTITIAL
//   : "ca-app-pub-5120759618248888/9392760660";
// const adUnitIdBanner = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-5120759618248888/6385972308";
// const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ["fashion", "clothing"],
// });

export default function BooksScreen() {
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
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUniversities = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(firestoreDB, "books"));
      const bookList = [];
      querySnapshot.forEach((doc) => {
        bookList.push(doc.data());
      });

      if (bookList.length > 0) {
        console.log("Fetched data:", bookList);
        setUniversities(bookList);
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 4,
          borderRadius: 4,
          padding: 5,
        }}
      >
        <Text style={style.subject}>
          Name:{" "}
          <Text style={[style.teacher, { fontSize: 12 }]}> {item.name}</Text>
        </Text>
        <Text style={style.source}>
          Author:
          <Text style={[style.teacher, { fontSize: 12 }]}>
            {item.author ? item.author : "Unknown"}
          </Text>
        </Text>
        <Text style={style.source}>
          Source:
          <Text style={[style.teacher, { fontSize: 12 }]}>
            {item.source ? item.source : "Unknown"}
          </Text>
        </Text>
        <Ionicons
          name="ios-cloud-download"
          size={40}
          color="#E367A6"
          onPress={() => {
            if (item?.link === "link") {
              alert("Notes not available yet");
            } else {
              Linking.openURL(item.link);
            }
          }}
          style={{ alignSelf: "center" }}
        />
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
          List of Books
        </Text>
        {!loading ? (
          <FlatList data={universities} renderItem={renderItem} />
        ) : (
          <ActivityIndicator size={"large"} color={"#CB61C5"} />
        )}
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
