import React, { useState } from "react";
import { Text, View, StyleSheet, Modal, TextInput } from "react-native";
import AddAClubButton from "../helpers/components/AddAClubButton";
import ClubPicker from "../helpers/components/ClubPicker";
import MaxPicker from "../helpers/components/MaxPicker";

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
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 15,
    backgroundColor: "#edf6f9",
    padding: 10,
  },
  addEdit: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 15,
    backgroundColor: "#edf6f9",
    padding: 10,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 50,
    fontSize: 18,
    backgroundColor: "#edf6f9",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "black",
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

  const [addClub, setAddClub] = useState();
  const [addClubMin, setAddClubMin] = useState();
  const [addClubMax, setAddClubMax] = useState("");
  const [addClubPercent, setAddClubPercent] = useState();
  const [editClubMin, setEditClubMin] = useState();
  const [editClubMax, setEditClubMax] = useState();
  const [editClubPercent, setEditClubPercent] = useState();

  let newClub = {
    club: addClub,
    min: addClubMin,
    max: addClubMax,
    minPow: addClubPercent,
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
        <View style={styles.addModal}>
          <View style={styles.pickerContainer}>
            <ClubPicker />
          </View>
          <View style={styles.pickerContainer}>
            <Text>Max</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setAddClubMax(text)}
              value={addClubMax}
              placeholder={"  yds"}
              keyboardType={"number-pad"}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text>Min</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setAddClubMin(text)}
              value={addClubMin}
              placeholder={"  yds"}
              keyboardType={"number-pad"}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>Percent</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setAddClubPercent(text)}
              value={addClubPercent}
              placeholder={"  % power"}
              keyboardType={"number-pad"}
            />
          </View>
          <AddAClubButton onPress={() => setAddModalOpen(false)} text="exit" />
          {/* <button to save whole thing> */}
        </View>
      </Modal>
      {CreateBag()}
    </View>
  );
}
