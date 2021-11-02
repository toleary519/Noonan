import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AddAClubButton from "../helpers/components/AddAClubButton";
// import ClubPicker from "../helpers/components/ClubPicker";
// import MaxPicker from "../helpers/components/MaxPicker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf6f9",
  },
  box: {
    height: 100,
  },
  club: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 25,
    backgroundColor: "#edf6f9",
    padding: 10,
  },
  addModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
    backgroundColor: "#edf6f9",
  },
  addEdit: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 15,
    backgroundColor: "#edf6f9",
    padding: 10,
  },
  pickerContainer: {
    textAlign: "center",
    width: 150,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 50,
    fontSize: 18,
    backgroundColor: "#edf6f9",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "black",
  },
  inputTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  picker: {
    width: 150,
  },
  exitSaveFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const shots = [
  { club: "60", min: 5, max: 25, minPow: 50 },
  { club: "56", min: 26, max: 45, minPow: 50 },
  { club: "52", min: 46, max: 80, minPow: 50 },
  { club: "PW", min: 81, max: 139, minPow: 50 },
  { club: "9 Iron", min: 140, max: 159, minPow: 50 },
  { club: "8 Iron", min: 150, max: 164, minPow: 50 },
  { club: "7 Iron", min: 165, max: 179, minPow: 50 },
  { club: "6 Iron", min: 180, max: 200, minPow: 50 },
];

const CreateBag = () => {
  return shots.map((shot, i) => {
    return (
      <View key={i} style={styles.club}>
        {/* <View>Modal to Edit</View> */}
        <Text style={styles.club}>{shot.club}</Text>
        <Text style={styles.club}>MIN : {shot.min}</Text>
        <Text style={styles.club}>MAX : {shot.max}</Text>
      </View>
    );
  });
};

const saveNewClub = (clubOBJ) => {
  shots.push(clubOBJ);
};

export default function BagScreen(props) {
  const [addModalOpen, setAddModalOpen] = useState(false);

  // const [addClubState, setAddClubState] = useState({
  //   addClub: "",
  //   addClubMax: "",
  //   addClubMin: "",
  //   addClubPercent: "",
  // });
  // const [editClubState, setEditClubState] = useState({
  //   editClubMax: "",
  //   editClubMin: "",
  //   editClubPercent: "",
  // });
  const pickerClubs = [
    "Driver",
    "3w",
    "5w",
    "1i",
    "2i",
    "3i",
    "4i",
    "5i",
    "6i",
    "7i",
    "8i",
    "9i",
    "PW",
    "SW",
    "52",
    "54",
    "56",
    "60",
  ];
  const [pickerValue, setPickerValue] = useState(pickerClubs[0]);
  const [addClub, setAddClub] = useState(null);
  const [addClubMin, setAddClubMin] = useState(null);
  const [addClubMax, setAddClubMax] = useState(null);
  const [addClubPercent, setAddClubPercent] = useState(null);
  const [editClubMin, setEditClubMin] = useState(null);
  const [editClubMax, setEditClubMax] = useState(null);
  const [editClubPercent, setEditClubPercent] = useState(null);

  let newClub = {
    club: pickerValue,
    min: addClubMin,
    max: addClubMax,
    minPow: addClubPercent,
  };

  const clearAll = () => {
    setPickerValue(pickerClubs[0]);
    setAddClubMin(null);
    setAddClubMax(null);
    setAddClubPercent(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.club}>Your Bag</Text>
      <AddAClubButton
        style={styles.addEdit}
        onPress={() => setAddModalOpen(true)}
        text="add"
      />
      <Modal visible={addModalOpen} animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.addModal}>
            <View>
              <Text style={styles.inputTitle}>Add A Club</Text>
              <Picker
                style={styles.picker}
                selectedValue={pickerValue}
                onValueChange={(item) => {
                  setPickerValue(item);
                }}
              >
                {pickerClubs.map((item) => (
                  <Picker.Item key={item} value={item} label={item} />
                ))}
              </Picker>
            </View>
            <View>
              <Text style={styles.inputTitle}>Max</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setAddClubMax(text)}
                value={addClubMax}
                placeholder={"yds"}
                keyboardType={"number-pad"}
                textAlign={"center"}
              />
            </View>
            <View>
              <Text style={styles.inputTitle}>Min</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setAddClubMin(text)}
                value={addClubMin}
                placeholder={"yds"}
                keyboardType={"number-pad"}
                textAlign={"center"}
              />
            </View>
            <View>
              <Text style={styles.inputTitle}>Percent</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setAddClubPercent(text)}
                value={addClubPercent}
                placeholder={"% power"}
                keyboardType={"number-pad"}
                textAlign={"center"}
              />
            </View>
            <View style={styles.exitSaveFooter}>
              <AddAClubButton
                onPress={() => {
                  setAddModalOpen(false);
                  clearAll();
                }}
                text="exit"
              />
              <AddAClubButton
                onPress={() => {
                  saveNewClub(newClub);
                  console.log(shots);
                  clearAll();
                  setAddModalOpen(false);
                }}
                text="save"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ScrollView>{CreateBag()}</ScrollView>
    </View>
  );
}
