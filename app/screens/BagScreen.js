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
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AddAClubButton from "../helpers/components/AddAClubButton";
import {
  MaterialCommunityIcons,
  EvilIcons,
  AntDesign,
  Ionicons,
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
    fontSize: 15,
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
    height: 50,
    fontSize: 18,
    backgroundColor: "#edf6f9",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 10,
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
  paragraph: {
    flex: 1,
    marginTop: 50,
    fontSize: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  editBox: {
    flexDirection: "column",
  },
  editTitle: {
    flexDirection: "row",
    width: "100%",
    fontSize: 35,
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 15,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
});

const shots = [
  { key: 0, club: "60", min: 5, max: 25, minPow: 50 },
  { key: 1, club: "56", min: 26, max: 45, minPow: 50 },
  { key: 2, club: "52", min: 46, max: 80, minPow: 50 },
  { key: 3, club: "PW", min: 81, max: 139, minPow: 50 },
  { key: 4, club: "9i", min: 140, max: 159, minPow: 50 },
  { key: 5, club: "8i", min: 150, max: 164, minPow: 50 },
  { key: 6, club: "7i", min: 165, max: 179, minPow: 50 },
  { key: 7, club: "6i", min: 180, max: 200, minPow: 50 },
];

const reset = { key: null, club: null, min: null, max: null, minPow: null };

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

export default function BagScreen({ navigation }) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editDisplayOpen, setEditDisplayOpen] = useState(false);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState(pickerClubs[0]);
  const [editValue, setEditValue] = useState(shots[0]);
  const [addClubMin, setAddClubMin] = useState(null);
  const [addClubMax, setAddClubMax] = useState(null);
  const [addClubPercent, setAddClubPercent] = useState(null);
  const [editClubMin, setEditClubMin] = useState(null);
  const [editClubMax, setEditClubMax] = useState(null);
  const [editClubPercent, setEditClubPercent] = useState(null);

  let newClub = {
    key: shots.length,
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
    setEditValue(reset);
    setEditClubMin(null);
    setEditClubMax(null);
    setEditClubPercent(null);
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

  // const deleteClub = (editValue) => {
  //   for (const shot of shots) {
  //     if ((shot.key = editValue.key)) {
  //       shots.splice(shot.key, 1);
  //     }
  //   }
  // // };
  // const deleteClub = shots.filter(s => s.key !== editValue.key);

  // const QuestionModal = () => (
  //   <Modal visible={questionModalOpen} animationType="fade">
  //     <View style={styles.paragraph}>
  //       <Text style={styles.paragraph}>
  //         {" "}
  //         Noonan uses the minumum power to calculate the spread of your club.
  //         For example, if you hit your PW 100yds at 100% of your swing and 75yds
  //         at 50% swing your input would be MAX: 100, MIN: 75, %: 50.{" "}
  //       </Text>
  //       <Ionicons
  //         onPress={() => setQuestionModalOpen(false)}
  //         name="close-circle"
  //         size={24}
  //         color="black"
  //       />
  //     </View>
  //   </Modal>
  // );

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/texture-background.jpeg")}
        resizeMode="cover"
      > */}
      <Ionicons
        name="arrow-back"
        onPress={() => navigation.navigate("noonan")}
        size={24}
        color="black"
      />
      <Text style={styles.club}>Your Bag</Text>
      {editDisplayOpen ? null : (
        <AddAClubButton
          style={styles.addEdit}
          onPress={() => setAddModalOpen(true)}
          text="add"
        />
      )}
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
              {/* <QUESTION MARK MODAL ************************************************> */}
              <QuestionModal />
              {/* <QUESTION MARK MODAL ENDS ************************************************> */}
              <View style={styles.row}>
                <Text style={styles.inputTitle}>Percent</Text>
                <AntDesign
                  onPress={() => setQuestionModalOpen(true)}
                  name="questioncircleo"
                  size={24}
                  color="black"
                />
              </View>
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
      {/* < LIST STARTS ************************************************> */}
      <View>
        <FlatList
          data={shots}
          renderItem={({ item }) => (
            <View style={styles.club}>
              <TouchableOpacity
                onPress={() => {
                  setEditValue(shots[item.key]);
                  setEditDisplayOpen(true);
                  console.log("Outside - editValue:", editValue);
                }}
              >
                {editDisplayOpen ? null : <Text>{item.club}</Text>}
              </TouchableOpacity>
            </View>
          )}
        />
        {editDisplayOpen ? (
          <View style={styles.editBox}>
            <Text style={styles.editTitle}>{editValue.club}</Text>
            <View style={styles.row} marginBottom={8}>
              <Text fontSize={15}>max</Text>
              <Text fontSize={15}>min</Text>
              <Text fontSize={15}>%</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setEditClubMax(text)}
                value={editClubMax}
                placeholder={String(editValue.max)}
                keyboardType={"number-pad"}
                textAlign={"center"}
              />
              {console.log("Inside - editValue:", editValue)}
              <TextInput
                style={styles.input}
                onChangeText={(text) => setEditClubMin(text)}
                value={editClubMin}
                placeholder={String(editValue.min)}
                keyboardType={"number-pad"}
                textAlign={"center"}
              />
              {console.log(
                "editVal Max",
                editValue.max,
                "editVal Min:",
                editValue.min
              )}
              <TextInput
                style={styles.input}
                onChangeText={(text) => setEditClubPercent(text)}
                value={editClubPercent}
                placeholder={String(editValue.minPow)}
                keyboardType={"number-pad"}
                textAlign={"center"}
              />
            </View>

            <View style={styles.row}>
              <AddAClubButton
                onPress={() => {
                  editClearAll();
                  setEditDisplayOpen(false);
                }}
                text="exit"
              />
              <AntDesign
                onPress={() => setQuestionModalOpen(true)}
                name="questioncircleo"
                size={24}
                color="black"
              />
              <AddAClubButton
                onPress={() => {
                  editClub(editValue);
                  editClearAll();
                  setEditDisplayOpen(false);
                }}
                text="save"
              />
            </View>
            <QuestionModal />
          </View>
        ) : null}
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}
