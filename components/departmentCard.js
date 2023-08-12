import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function DepartmentCard({ deptName, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-around",
        alignItems: "center",
        //borderWidth: 1,
        width: "95%",
        borderRadius: 5,
        marginBottom: 4,
        padding: 2,
        backgroundColor:'#D4D4D4',
        height:60
      }}
      onPress={onPress}
    >
      <MaterialIcons name="brightness-1" size={16} color="#E367A6" />
      <Text
        style={{
          fontSize: 14,
          fontFamily: "RR",
          padding: 4,
          alignSelf: "center",
          width: "70%",
          margin: 4,
        }}
      >
        {deptName}
      </Text>
    </TouchableOpacity>
  );
}
