import { TouchableOpacity, Text } from "react-native";

export default function CustomButton({
  name,
  onPress,
  buttonStyle,
  nameStyle,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={nameStyle}>{name}</Text>
    </TouchableOpacity>
  );
}
