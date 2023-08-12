import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import style, { appColor } from "../components/styles";
// import {
//   InterstitialAd,
//   TestIds,
//   AdEventType,
//   BannerAd,
//   BannerAdSize,
// } from "react-native-google-mobile-ads";
import { useEffect, useState } from "react";
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
export default function AboutScreen() {
  const [loaded, setLoaded] = useState(false);

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
    <SafeAreaView
      style={{ flex: 1 }}
    >

      <View style={{ flex: 0.7,backgroundColor:appColor ,justifyContent:'center',borderBottomLeftRadius:30,borderBottomRightRadius:30}}>
        <StatusBar backgroundColor={appColor} style="dark" />
        <Text style={[style.textStyle, { fontSize: 28,color:'#fff' }]}>Unipedia</Text>
        <Text
          style={{
            textAlign: "justify",
            fontFamily: "RM",
            margin: 20,
            padding: 10,
            fontSize: 14,
            color:'#fff'
          }}
        >
          Unipedia is an intiative for university students to provide them notes
          and past papers at a single place. The notes and past papers are
          collected from students and uploaded to database which are available in
          the app. If you find that you have something valueable for others then
          contact us to share that content with others.
        </Text>
      </View>
      <View style={{ flex: 0.2 }}>
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
        <TouchableOpacity style={style.contactButton} onPress={ContactUsHandler}>
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

    </SafeAreaView>
  );
}
