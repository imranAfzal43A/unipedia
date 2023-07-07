import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export default function UniCard({ uniName, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop:8
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 14,
          padding: 4,
          alignSelf: "center",
          width: "90%",
          fontFamily:'RM'
        }}
      >
        {uniName}
      </Text>
      <FontAwesome name="angle-right" size={28} color="#CB61C5" />
    </TouchableOpacity>
  );
}
