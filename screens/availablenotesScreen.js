import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import style from "../components/styles";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import * as Linking from "expo-linking";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../config/firebaseConfig";
export default function AvailAbleNotesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log("", route.params);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
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
            Subject: <Text style={style.teacher}>{item.subject}</Text>
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
  return (
    <SafeAreaView style={style.settigsScreens}>
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
            <Text style={style.textStyle}>Sorry! no notes available</Text>
          )}
        </>
      ) : (
        <ActivityIndicator size={"large"} color={"#E367A6"} />
      )}
    </SafeAreaView>
  );
}
