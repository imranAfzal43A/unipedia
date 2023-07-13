import { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import UniCard from "../components/uniCard";
import { useNavigation } from "@react-navigation/native";
import { firestoreDB } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

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

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

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
      <View style={{ marginTop: 30, margin: 10, padding: 10 }}>
        <Text style={{ fontSize: 18, fontFamily: "RM", margin: 2 }}>
          List of Universites
        </Text>
        {!loading ? (
          <FlatList data={universities} renderItem={renderItem} />
        ) : (
          <ActivityIndicator size={"large"} color={"#CB61C5"} />
        )}
        <Button
          title="Show Interstitial"
          onPress={() => {
            interstitial.show();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
