import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";
import AddAClubButton from "../helpers/components/AddAClubButton";
import { colors } from "../assets/colors/colors";
import {
  MaterialCommunityIcons,
  EvilIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const shots = [
  { key: 0, club: "60", min: 5, max: 25, minPow: 50 },
  { key: 1, club: "56", min: 26, max: 45, minPow: 50 },
  { key: 2, club: "52", min: 46, max: 80, minPow: 50 },
  { key: 3, club: "Pw", min: 81, max: 139, minPow: 50 },
  { key: 4, club: "9i", min: 140, max: 159, minPow: 50 },
  { key: 5, club: "8i", min: 150, max: 164, minPow: 50 },
  { key: 6, club: "7i", min: 165, max: 179, minPow: 50 },
  { key: 7, club: "6i", min: 180, max: 200, minPow: 50 },
];

/* <NEEDS TO GO TO STORAGE ^^^^^^^^^^^^^^> */

const reset = { key: null, club: null, min: null, max: null, minPow: null };

const pickerClubs = [
  "Dr",
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

function BagScreenFormat({ navigation }) {
  const [addDisplayOpen, setAddDisplayOpen] = useState(false);
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
    setEditValue(shots[0]);
    setEditClubMin(null);
    setEditClubMax(null);
    setEditClubPercent(null);
  };

  const editClub = (item) => {
    for (const shot of shots) {
      if (shot.club === item.club) {
        shot.max = Number(editClubMax) || shot.max;
        shot.min = Number(editClubMin) || shot.min;
        shot.minPow = Number(editClubPercent) || shot.minPow;
      }
    }
  };

  const deleteClub = (editValue) => {
    for (const shot of shots) {
      if ((shot.key = editValue.key)) {
        shots.splice(shot.key, 1);
      }
    }
  };

  return (
    // <ADD CLUB VIEW BEGINS HERE *****************************************************************************>
    <View style={styles.bagContainer}>
      {addDisplayOpen ? (
        <KeyboardAwareScrollView
          style={styles.leftContainer}
          extraHeight={hp("15%")}
        >
          <View style={styles.leftContainer}>
            <View style={styles.editTopContainer}>
              <Picker
                itemStyle={styles.picker}
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

            <View style={styles.editChunk}>
              <View style={styles.explinationElement}>
                <Text style={styles.explainText}>-MAX-</Text>
                <Text style={styles.explainText}>
                  How far do you hit {pickerValue} with a full swing?
                </Text>
              </View>
              <View style={styles.valuesElement}>
                <TextInput
                  style={styles.editValuesText}
                  onChangeText={(text) => setAddClubMax(text)}
                  value={addClubMax}
                  placeholder={"yds"}
                  keyboardType={"number-pad"}
                  textAlign={"center"}
                />
              </View>
            </View>
            <View style={styles.editChunk}>
              <View style={styles.explinationElement}>
                <Text style={styles.explainText}>-% Power-</Text>
                <Text style={styles.explainText}>
                  What is the minimum power you would swing this club before
                  clubbing down?
                </Text>
              </View>
              <View style={styles.valuesElement}>
                <TextInput
                  style={styles.editValuesText}
                  onChangeText={(text) => setAddClubPercent(text)}
                  value={addClubPercent}
                  placeholder={"%"}
                  keyboardType={"number-pad"}
                  textAlign={"center"}
                />
              </View>
            </View>
            <View style={styles.editChunk}>
              <View
                style={[styles.explinationElement, { borderRightWidth: 0 }]}
              >
                <Text style={styles.explainText}>-MIN-</Text>
                <Text style={styles.explainText}>
                  How far do you hit {pickerValue}{" "}
                  {addClubPercent
                    ? `with a ${addClubPercent} % swing?`
                    : `on your most conservative swing?`}
                </Text>
              </View>
              <View style={styles.valuesElement}>
                <TextInput
                  style={styles.editValuesText}
                  onChangeText={(text) => setAddClubMin(text)}
                  value={addClubMin}
                  placeholder={"yds"}
                  keyboardType={"number-pad"}
                  textAlign={"center"}
                />
              </View>
            </View>
            <View style={styles.editExitBox}>
              <AntDesign
                name="save"
                onPress={() => {
                  saveNewClub(newClub);
                  console.log(shots);
                  addClearAll();
                  setAddDisplayOpen(false);
                }}
                size={60}
                color={colors.green}
                style={[{ left: wp("4%") }, { padding: hp("-1%") }]}
              />
              <Ionicons
                name="remove-circle-outline"
                onPress={() => {
                  setAddDisplayOpen(false);
                  addClearAll();
                }}
                size={60}
                color={colors.red}
                style={[{ left: wp("4%") }, { padding: hp("1%") }]}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      ) : null}
      {/* // <ADD CLUB VIEW ENDS HERE *****************************************************************************> */}
      {/* <EDIT DISPLAY STARTS ****************************************************************************> */}
      {addDisplayOpen ? null : (
        <KeyboardAwareScrollView
          style={styles.leftContainer}
          extraHeight={hp("15%")}
        >
          <View style={styles.editTopContainer}>
            <Text
              style={
                editValue.club === "Pw" || "60" || "56" || "52"
                  ? [styles.editClubText, { fontSize: hp("15.5%") }]
                  : styles.editClubText
              }
            >
              {editValue.club}
            </Text>
          </View>
          <View style={styles.valuesContainer}></View>
          <View style={styles.explinationContainer}>
            <View style={styles.editChunk}>
              <View style={styles.explinationElement}>
                <Text style={styles.explainText}>-MAX-</Text>
                <Text style={styles.explainText}>
                  How far do you hit {editValue.club} with a full swing?
                </Text>
              </View>
              <View style={styles.valuesElement}>
                <TextInput
                  style={styles.editValuesText}
                  onChangeText={(text) => setEditClubMax(text)}
                  value={editClubMax}
                  placeholder={String(editValue.max)}
                  keyboardType={"number-pad"}
                  textAlign={"center"}
                />
              </View>
            </View>
            <View style={styles.editChunk}>
              <View style={styles.explinationElement}>
                <Text style={styles.explainText}>-% Power-</Text>
                <Text style={styles.explainText}>
                  What is the minimum power you would swing this club before
                  clubbing down?
                </Text>
              </View>
              <View style={styles.valuesElement}>
                <TextInput
                  style={styles.editValuesText}
                  onChangeText={(text) => setEditClubPercent(text)}
                  value={editClubPercent}
                  placeholder={String(editValue.minPow)}
                  keyboardType={"number-pad"}
                  textAlign={"center"}
                />
              </View>
            </View>
            <View style={styles.editChunk}>
              <View style={styles.explinationElement}>
                <Text style={styles.explainText}>-MIN-</Text>
                <Text style={styles.explainText}>
                  How far do you hit {editValue.club} with a{" "}
                  {editClubPercent ? editClubPercent : editValue.minPow}% swing?
                </Text>
              </View>
              <View style={styles.valuesElement}>
                <TextInput
                  style={styles.editValuesText}
                  onChangeText={(text) => setEditClubMin(text)}
                  value={editClubMin}
                  placeholder={String(editValue.min)}
                  keyboardType={"number-pad"}
                  textAlign={"center"}
                />
              </View>
            </View>
          </View>
          <View style={styles.editExitBox}>
            <AntDesign
              name="save"
              onPress={() => {
                editClub(editValue);
                editClearAll();
              }}
              size={60}
              color={colors.green}
              style={[{ left: wp("4%") }, { padding: hp("-1%") }]}
            />
            {/* <BROKEN DELETE FUNCTION NEEDS TO BE UPDATED TO WORK WITH NEW FUNCTIONALITY ********************************> */}
            {/* <AntDesign
            name="delete"
            onPress={() => {
              deleteClub(editValue);
              editClearAll();
            }}
            size={60}
            color={colors.red}
          /> */}
            {/* <BROKEN DELETE FUNCTION NEEDS TO BE UPDATED TO WORK WITH NEW FUNCTIONALITY ********************************> */}
          </View>
        </KeyboardAwareScrollView>
      )}
      {/* <EDIT DISPLAY ENDS HERE ***********************************************************> */}
      {/* <RIGHT SIDE STARTS HERE ****************************************************************> */}
      <ScrollView>
        <View style={styles.rightContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>bag</Text>
          </View>
          <View style={styles.addExitBox}>
            <Ionicons
              name="md-add-circle-outline"
              onPress={() => setAddDisplayOpen(true)}
              size={40}
              color={colors.green}
            />
            <Ionicons
              name="ios-exit-outline"
              onPress={() => navigation.navigate("noonan")}
              size={40}
              color={colors.red}
              style={{ left: wp("1%") }}
            />
          </View>

          {shots.map((item) => (
            <View key={item.key} style={styles.clubElement}>
              <TouchableOpacity
                onPress={() => {
                  setEditValue(shots[item.key]);
                  // setEditDisplayOpen(true);
                  console.log("Outside - editValue:", editValue);
                }}
              >
                <View style={styles.clubNameBox}>
                  <Text style={styles.elementText}>{item.club}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default BagScreenFormat;

const styles = StyleSheet.create({
  bagContainer: {
    flexDirection: "row",
  },
  rightContainer: {
    width: wp("35%"),
  },
  leftContainer: {
    width: wp("65%"),
  },
  topContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    justifyContent: "row",
    justifyContent: "center",
    alignItems: "center",
    height: hp("7%"),
    width: wp("26.33"),
    margin: wp("2%"),
  },
  titleText: {
    textAlign: "center",
    fontSize: hp("4%"),

    fontFamily: "Roboto-bold",
  },
  addExitBox: {
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: wp("34%"),
    marginRight: wp("4%"),
  },

  clubElement: {
    // borderWidth: 1,
    flexDirection: "column",
    height: hp("6%"),
    width: wp("26.33"),
    justifyContent: "center",
    alignItems: "center",
  },
  clubNameBox: {
    justifyContent: "center",
    alignItems: "center",
    height: hp("5%"),
    width: wp("28%"),
    left: wp("4%"),
    backgroundColor: colors.blue,
    borderRadius: wp("2%"),
  },
  elementText: {
    fontSize: hp("2.5%"),
    fontFamily: "Roboto-regular",
  },
  statsMax: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
  },
  statsMin: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // <EDIT DISPLAY STYLES ****************************************************************>
  editContainer: {
    flexDirection: "column",
  },
  editTopContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  editClubText: {
    textAlign: "center",
    fontSize: hp("20.5%"),
    fontFamily: "Roboto-regular",
  },
  editExitBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: wp("3%"),
  },
  valuesElement: {
    flexDirection: "column",
    justifyContent: "center",
    height: hp("12.5"),
    width: wp("20%"),
    borderTopRightRadius: hp("2%"),
    borderBottomRightRadius: hp("2%"),
    backgroundColor: colors.blue,
  },
  editChunk: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: wp("5%"),
  },
  explinationElement: {
    flexDirection: "column",
    justifyContent: "center",
    height: hp("16%"),
    width: wp("29%"),
    borderTopRightRadius: hp("2%"),
    borderBottomRightRadius: hp("2%"),
    borderTopLeftRadius: hp("2%"),
    borderBottomLeftRadius: hp("2%"),
    backgroundColor: colors.green,
  },
  editValuesText: {
    textAlign: "center",
    fontSize: hp("2.5%"),
    fontFamily: "Roboto-regular",
  },
  explainText: {
    textAlign: "center",
    fontSize: hp("1%"),
    marginRight: wp("2%"),
    marginLeft: wp("2%"),
    color: colors.bg,
    fontFamily: "Roboto-regular",
  },
  picker: {
    height: hp("25%"),
    width: wp("50%"),
    fontSize: hp("10%"),
    fontFamily: "Roboto-regular",
  },
});
