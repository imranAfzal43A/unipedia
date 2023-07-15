import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export default function UniCard({ uniName, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flex:1,
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
      
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 14,
          padding: 4,
          alignSelf: "center",
          width: "90%",
          fontFamily: "RB",
        }}
      >
        {uniName}
      </Text>

      <FontAwesome name="caret-right" size={28} color= "#E367A6" />
    </TouchableOpacity>
  );
}
