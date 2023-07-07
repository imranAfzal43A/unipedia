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
import SepratorLine from "../components/sepratorLine";
import * as Linking from "expo-linking";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import CustomButton from "../components/myButton";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function AvailAbleNotesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log("", route.params);
  const [notes, setNotes] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const CACHE_KEY = "notesCache";
  const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  const getNotes = useCallback(async () => {
    try {
      const docRef = doc(
        firestoreDB,
        "data",
        route.params.details.departmentID
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const departments = docSnap.data();
        setNotes(
          departments.semesters[route.params.details.semester - 1].notes
        );
        setPapers(
          departments.semesters[route.params.details.semester - 1].papers
        );
        setLoading(false);
      } else {
        setLoading(false);
        console.log("No such document!");
      }
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
            Teacher: <Text style={style.teacher}>{item.teacher}</Text>
          </Text>
          <Text style={style.source}>
            Source: <Text style={style.teacher}>{item.source}</Text>
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Ionicons
            name="ios-cloud-download"
            size={30}
            color="#CB61C5"
            onPress={() => alert("Sorry notes will be available soon")}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={style.settigsScreens}>
      <Text style={style.appBarTitle}>{route.params.details.department}</Text>
      <TouchableOpacity
        style={style.backButton}
        onPress={() => navigation.goBack()}
      >
        <Entypo name={"chevron-left"} size={24} color="black" />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <Text style={style.textStyle}>{route.params.details.program}</Text>
        <Text style={style.textStyle}>
          Semester {route.params.details.semester}
        </Text>
      </View>
      {!loading ? (
        <>
          <Text style={[style.textStyle, { alignSelf: "flex-start" }]}>
            Notes
          </Text>
          {notes.length != 0 ? (
            <FlatList data={notes} renderItem={renderItem} />
          ) : (
            <Text style={style.textStyle}>Sorry! no notes available</Text>
          )}
          <Text style={[style.textStyle, { alignSelf: "flex-start" }]}>
            Past papers
          </Text>
          {papers.length != 0 ? (
            <FlatList data={notes} renderItem={renderItem} />
          ) : (
            <Text style={style.textStyle}>Sorry! no papers available</Text>
          )}
        </>
      ) : (
        <ActivityIndicator size={"large"} color={"#CB61C5"} />
      )}
    </SafeAreaView>
  );
}
