import { Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function DepartmentCard({ deptName, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CB61C5",
        width: "90%",
        borderRadius: 4,
        margin: 4,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: "RR",
          padding: 4,
          alignSelf: "center",
          width: "70%",
          margin: 4,
        }}
      >
        {deptName}
      </Text>
      <AntDesign name="laptop" size={24} color="black" />
    </TouchableOpacity>
  );
}
