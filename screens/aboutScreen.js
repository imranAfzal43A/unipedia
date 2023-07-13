import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import style from "../components/styles";
export default function AboutScreen() {
  const ContactUsHandler = () => {
    const phoneNumber = "+923170695979";
    const message =
      "Hi, I want to contribute in Unipedia. I have something to share";

    Linking.canOpenURL("whatsapp://send").then((supported) => {
      if (supported) {
        Linking.openURL(
          `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
          )}`
        );
      } else {
        console.log("WhatsApp is not installed on this device");
      }
    });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
    >
      <Text style={style.textStyle}>Unipedia</Text>
      <Text
        style={{
          textAlign: "justify",
          fontFamily: "RR",
          margin: 20,
          padding: 10,
          fontSize: 12,
        }}
      >
        Unipedia is an intiative for university students to provide them notes
        and past papers at a single place. The notes and past papers are
        collected from students and uploaded to database which are available in
        the app. If you find that you have something valueable for others then
        contact us to share that content with others.
      </Text>
      <Text
        style={{
          textAlign: "justify",
          fontFamily: "RM",
          margin: 20,
          padding: 10,
          alignSelf: "center",
          color: "red",
          fontSize: 10,
        }}
      >
        For suggestion and contribution.
      </Text>
      <TouchableOpacity style={style.contactButton} onPress={ContactUsHandler}>
        <Ionicons
          name="ios-logo-whatsapp"
          size={20}
          color="#E367A6"
          style={{ alignSelf: "center" }}
        />
        <Text style={[style.textStyle, { padding: 11, marginTop: 8 }]}>
          Contact Us
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
