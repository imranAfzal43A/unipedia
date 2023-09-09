import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import style from "../components/styles";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import * as Linking from "expo-linking";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../config/firebaseConfig";
// import {
//   InterstitialAd,
//   TestIds,
//   AdEventType,
//   BannerAd,
//   BannerAdSize,
// } from "react-native-google-mobile-ads";
import { StatusBar } from "expo-status-bar";

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
export default function AvailAbleNotesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log("", route.params);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const unsubscribeLoaded = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //       console.log("Ad loaded successfully.");
  //     }
  //   );

  //   const unsubscribeError = interstitial.addAdEventListener(
  //     AdEventType.ERROR,
  //     (error) => {
  //       console.log("Ad failed to load: ", error);
  //     }
  //   );

  //   interstitial.load();

  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeError();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (loaded) {
  //     interstitial.show();
  //     setLoaded(false);
  //   }
  // }, [loaded]);
  const getNotes = useCallback(async () => {
    const url = `data/${route.params.details.departmentID}/${route.params.details.url}`;
    console.log(url);
    try {
      const querySnapshot = await getDocs(collection(firestoreDB, url));
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push(doc.data());
      });

      if (notes.length > 0) {
        setNotes(notes);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("Error! Cannot get notes:", e);
    }
  }, []);
  useEffect(() => {
    getNotes();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={style.notesCard}>
        <View>
          <Text style={style.subject}>
            Subject: <Text style={style.teacher}> {item.subject}</Text>
          </Text>
          <Text style={style.source}>
            Teacher:
            <Text style={style.teacher}>
              {item.teacher ? item.teacher : "Unknown"}
            </Text>
          </Text>
          <Text style={style.source}>
            Source:
            <Text style={style.teacher}>
              {item.source ? item.source : "Unknown"}
            </Text>
          </Text>
          <Text style={style.source}>
            Type:
            <Text style={style.teacher}>
              {item.type ? item.type : "Unknown"}
            </Text>
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Ionicons
            name="ios-cloud-download"
            size={30}
            color="#E367A6"
            onPress={() => {
              if (item?.link === "link") {
                alert("Notes not available yet");
              } else {
                Linking.openURL(item.link);
              }
            }}
          />
        </View>
      </View>
    );
  };
  const ContactUsHandler = async () => {
    const phoneNumber = "+923170695979";
    const message =
      "Hi, I want to contribute to Unipedia. I have something to share";
    try {
      const whatsappUrl =
        Platform.OS === "ios"
          ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
          : `whatsapp://send?phone=+${phoneNumber}&text=${message}`;

      await Linking.openURL(whatsappUrl);
    } catch (error) {
      console.log("Error opening WhatsApp:", error);
    }
  };

  return (
    <SafeAreaView style={style.settigsScreens}>
      <StatusBar backgroundColor="#fff" style="dark" />
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={style.backButton}
          onPress={() => navigation.goBack()}
        >
          <Entypo name={"chevron-left"} size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={style.appBarTitle}>{route.params.details.department}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 50,
        }}
      >
        <Text style={style.textStyle}>{route.params.details.program}</Text>
        <Text style={style.textStyle}>
          Semester {route.params.details.semester}
        </Text>
      </View>
      {!loading ? (
        <>
          {notes.length != 0 ? (
            <FlatList data={notes} renderItem={renderItem} />
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <MaterialIcons name="error" size={40} color="#E367A6" />
              <Text style={[style.textStyle, { fontSize: 18 }]}>
                Sorry ! no notes available yet.
              </Text>
              <Text
                style={{
                  textAlign: "justify",
                  fontFamily: "RM",
                  margin: 20,
                  padding: 10,
                  alignSelf: "center",
                  color: "red",
                  fontSize: 12,
                }}
              >
                For suggestion and contribution.
              </Text>
              <TouchableOpacity
                style={style.contactButton}
                onPress={ContactUsHandler}
              >
                <Ionicons
                  name="ios-logo-whatsapp"
                  size={24}
                  color="#E367A6"
                  style={{ alignSelf: "center" }}
                />
                <Text style={[style.textStyle, { padding: 11, fontSize: 18 }]}>
                  Contact Us
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <ActivityIndicator size={"large"} color={"#E367A6"} />
      )}
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
