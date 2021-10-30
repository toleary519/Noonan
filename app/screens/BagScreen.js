import React, { useState } from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import AddAClubButton from "../helpers/components/AddAClubButton";

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

export default function BagScreen(props) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addClub, setAddClub] = useState();
  const [addClubMin, setAddClubMin] = useState();
  const [addClubMax, setAddClubMax] = useState();
  const [addClubPercent, setAddClubPercent] = useState();
  const [editClubMin, setEditClubMin] = useState();
  const [editClubMax, setEditClubMax] = useState();
  const [editClubPercent, setEditClubPercent] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.club}>Your Bag</Text>
      <AddAClubButton
        style={styles.addEdit}
        onPress={() => setAddModalOpen(true)}
        text="add"
      />
      <Modal visible={addModalOpen} animationType="slide">
        <View style={styles.addModal}>
          <Text style={styles.addModal}>club</Text>
          <Text style={styles.addModal}>max</Text>
          <Text style={styles.addModal}>min</Text>
          <Text style={styles.addModal}>min-percent</Text>
          <AddAClubButton onPress={() => setAddModalOpen(false)} text="exit" />
        </View>
      </Modal>
      {CreateBag()}
    </View>
  );
}
