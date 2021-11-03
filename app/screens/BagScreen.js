import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AddAClubButton from "../helpers/components/AddAClubButton";
import {
  MaterialCommunityIcons,
  EvilIcons,
  AntDesign,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    alignContent: "space-around",
    fontSize: 15,
    backgroundColor: "#edf6f9",
    padding: 10,
  },
  clubList: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  { key: 1, club: "60", min: 5, max: 25, minPow: 50 },
  { key: 2, club: "56", min: 26, max: 45, minPow: 50 },
  { key: 3, club: "52", min: 46, max: 80, minPow: 50 },
  { key: 4, club: "PW", min: 81, max: 139, minPow: 50 },
  { key: 5, club: "9i", min: 140, max: 159, minPow: 50 },
  { key: 6, club: "8i", min: 150, max: 164, minPow: 50 },
  { key: 7, club: "7i", min: 165, max: 179, minPow: 50 },
  { key: 8, club: "6i", min: 180, max: 200, minPow: 50 },
];

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

const saveNewClub = (clubOBJ) => {
  shots.push(clubOBJ);
};

export default function BagScreen(props) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState(pickerClubs[0]);
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

  const addClearAll = () => {
    setPickerValue(pickerClubs[0]);
    setAddClubMin(null);
    setAddClubMax(null);
    setAddClubPercent(null);
  };

  const editClearAll = () => {
    setAddClubMin(null);
    setAddClubMax(null);
    setAddClubPercent(null);
  };

  const editClub = (item) => {
    for (const shot of shots) {
      if (shot.club === item.club) {
        shot.max = Number(editClubMax);
        shot.min = Number(editClubMin);
        shot.minPow = Number(editClubPercent);
      }
    }
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
                  addClearAll();
                }}
                text="exit"
              />
              <AddAClubButton
                onPress={() => {
                  saveNewClub(newClub);
                  console.log(shots);
                  addClearAll();
                  setAddModalOpen(false);
                }}
                text="save"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* < THIS IS WHERE THE LIST STARTS > */}
      {/* < THIS IS WHERE THE LIST STARTS > */}
      {/* < THIS IS WHERE THE LIST STARTS > */}
      {/* < THIS IS WHERE THE LIST STARTS > */}
      {/* < THIS IS WHERE THE LIST STARTS > */}
      <FlatList
        data={shots}
        renderItem={({ item }) => (
          <View style={styles.club}>
            <TouchableOpacity onPress={() => setEditModalOpen(true)}>
              <View style={styles.club}>
                <Text>{item.club}</Text>
                <Text>MIN : {item.min}</Text>
                <Text>MAX : {item.max}</Text>
              </View>
            </TouchableOpacity>
            <Modal visible={editModalOpen} animationType="fade">
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.addModal}>
                  <View>
                    <Text style={styles.inputTitle}>Edit Club</Text>
                    <Text style={styles.inputTitle}>{item.club}</Text>
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>Max</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => setEditClubMax(text)}
                      value={editClubMax}
                      placeholder={"yds"}
                      keyboardType={"number-pad"}
                      textAlign={"center"}
                    />
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>Min</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => setEditClubMin(text)}
                      value={editClubMin}
                      placeholder={"yds"}
                      keyboardType={"number-pad"}
                      textAlign={"center"}
                    />
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>Percent</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => setEditClubPercent(text)}
                      value={editClubPercent}
                      placeholder={"% Power"}
                      keyboardType={"number-pad"}
                      textAlign={"center"}
                    />
                  </View>
                  <View style={styles.exitSaveFooter}>
                    <AddAClubButton
                      onPress={() => {
                        setEditModalOpen(false);
                        editClearAll();
                      }}
                      text="exit"
                    />
                    <AddAClubButton
                      onPress={() => {
                        editClub(item);
                        editClearAll();
                        setEditModalOpen(false);
                      }}
                      text="save"
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        )}
      />
    </View>
  );
}
