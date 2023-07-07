import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity
  } from "react-native";
  import style from "../components/styles";
  import { Entypo } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import SepratorLine from "../components/sepratorLine";
  import DepartmentCard from "../components/departmentCard";
  export default function DepartmentsScreen() {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={style.settigsScreens}>
        <Text style={style.appBarTitle}>Settings</Text>
        <TouchableOpacity
          style={style.backButton}
          onPress={() => navigation.goBack()}
        >
          <Entypo name={"chevron-left"} size={20} color="black" />
        </TouchableOpacity>
        <View style={{ justifyContent: "center", marginTop: 50 }}>
          <DepartmentCard deptName={"Solid State Physics"} />
          <SepratorLine />
        </View>
      </SafeAreaView>
    );
  }
  