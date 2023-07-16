import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const bsSemesters = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
];
const msSemesters = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];
export default function SelectSemester({
  modalVisible,
  setModalVisible,
  Department,
  onRequestClose,
  DepartmentID,
}) {
  const navigation = useNavigation();
  const [selectedProgram, setSelectedProgram] = useState("");
  const selectedProgramHandler = (program) => {
    if (selectedProgram === program) {
      setSelectedProgram("");
    } else {
      setSelectedProgram(program);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={[
          style.button,

          {
            width: "35%",
            borderColor: "#E367A6",
            borderWidth: 2,
            marginLeft: 20,
          },
        ]}
        onPress={() => {
          setModalVisible(false);
          navigation.navigate("AvailAbleNotes", {
            details: {
              department: Department,
              program: selectedProgram,
              semester: item.id,
              departmentID: DepartmentID,
              url: `${selectedProgram}${item.id}`,
            },
          });
        }}
      >
        <Text style={style.textStyle}>{item.id}</Text>
      </Pressable>
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={style.modalView}>
          <Text style={style.modalText}>Select your programme</Text>
          <Pressable
            style={[
              style.button,
              { backgroundColor: "#fff", borderWidth: 1, borderRadius: 6 },
              selectedProgram === "BS"
                ? { borderColor: "#E367A6" }
                : { borderColor: "#fff" },
            ]}
            onPress={() => selectedProgramHandler("BS")}
          >
            <Text style={style.textStyle}>BS</Text>
          </Pressable>
          {selectedProgram === "BS" ? (
            <FlatList
              data={bsSemesters}
              renderItem={renderItem}
              numColumns={2}
              style={{ alignSelf: "center" }}
            />
          ) : null}
          <Pressable
            style={[
              style.button,
              { marginTop: 20 },
              { backgroundColor: "#fff", borderWidth: 1, borderRadius: 6 },
              selectedProgram === "MS"
                ? { borderColor: "#E367A6" }
                : { borderColor: "#fff" },
            ]}
            onPress={() => selectedProgramHandler("MS")}
          >
            <Text style={style.textStyle}>M Phil / MS</Text>
          </Pressable>
          {selectedProgram === "MS" ? (
            <FlatList
              data={msSemesters}
              renderItem={renderItem}
              numColumns={2}
            />
          ) : null}
          
        </View>
        <AntDesign name="closecircle" size={40} color="#E367A6" onPress={setModalVisible} />
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    padding: 35,
    width: "80%",
    height: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    //elevation: 2,
    width: "90%",
    alignSelf: "center",
    margin: 6,
    backgroundColor: "#fff",
  },
  textStyle: {
    color: "black",
    fontFamily: "RM",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "RM",
  },
});
