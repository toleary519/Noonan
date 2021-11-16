import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../assets/colors/colors";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { addShotDB, deleteShotDB } from "../api/firebaseFunct";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { onSnapshot } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";

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
  "52°",
  "54°",
  "56°",
  "60°",
];

function BagScreenFormat({ navigation }) {
  const [shots, setShots] = useState([]);
  // establish the db for useEffect below
  const db = getFirestore();

  // get the entire shots collection from firestore and map them to shots state,
  // also pulling out the doc id to use as key below
  useEffect(
    () => {
      onSnapshot(collection(db, "shots"), (snapshot) =>
        setShots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    },
    // <Need to set editValue here ******************************>
    []
  );

  const [addDisplayOpen, setAddDisplayOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState(pickerClubs[0]);
  const [editValue, setEditValue] = useState(shots[0]);
  const [addClubMin, setAddClubMin] = useState(null);
  const [addClubMax, setAddClubMax] = useState(null);
  const [addClubPercent, setAddClubPercent] = useState(null);
  const [editClubMin, setEditClubMin] = useState(null);
  const [editClubMax, setEditClubMax] = useState(null);
  const [editClubPercent, setEditClubPercent] = useState(null);
  const [editButton, setEditButton] = useState(true);

  let newDBclub = {
    club: pickerValue,
    min: addClubMin,
    max: addClubMax,
    minPow: addClubPercent,
  };

  let editDBclub = {
    max: Number(editClubMax) || null,
    min: Number(editClubMin) || null,
    minPow: Number(editClubPercent) || null,
  };

  let editCheck = (editDBclub) => {
    //convert to entries
    const asArray = Object.entries(editDBclub);
    // filter to only include changes
    const filtered = asArray.filter(([key, value]) => value !== null);
    //objectify
    const payload = Object.fromEntries(filtered);

    console.log("payload: ", payload);
    return payload;
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

  //add shots to the db after form completed
  const addShotDB = async (newDBclub) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "shots"), { ...newDBclub });
    console.log("Document written with ID: ", docRef.id);
  };

  //edit shots in the db, use editCheck fn to only pass non null key,values
  const editShotDB = async (editDBclub, id) => {
    const docRef = doc(db, "shots", id);
    const payload = editCheck(editDBclub);
    await updateDoc(docRef, payload);
  };

  //deletes shots from the db after delete is clicked
  const deleteShotDB = async (id) => {
    const docRef = await deleteDoc(doc(db, "shots", id));
    console.log("delete document with ID: ", docRef.id);
  };

  // if in a loading state at the begining checks for shots to populate and then
  const updateState = () => {
    shots[0] ? setEditValue({ ...shots[0] }) : null;
    console.log("update state runs: ********");
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
                  // firebase function, newDBclub stretched
                  addShotDB(newDBclub);
                  setEditValue(newDBclub);
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
      {addDisplayOpen || shots.length === 0
        ? null
        : editValue && (
            <KeyboardAwareScrollView
              style={styles.leftContainer}
              extraHeight={hp("15%")}
            >
              <Text
                style={styles.editClubText}
                style={
                  editValue.club === "Pw" || "60" || "56" || "52"
                    ? [styles.editClubText, { fontSize: hp("14.5%") }]
                    : styles.editClubText
                }
              >
                {editValue.club}
              </Text>
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
                    {editClubPercent ? editClubPercent : editValue.minPow}%
                    swing?
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
              {editButton ? (
                <View style={styles.largeEditBtn}>
                  <TouchableOpacity onPress={() => setEditButton(false)}>
                    <Text style={styles.emptyText}>EDIT</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.editExitBox}>
                  <AntDesign
                    name="save"
                    onPress={() => {
                      editShotDB(editDBclub, editValue.id);
                      editClearAll();
                      setEditButton(true);
                      setEditValue(shots[0]);
                    }}
                    size={60}
                    color={colors.green}
                    style={[{ left: wp("4%") }, { padding: hp("-1%") }]}
                  />
                  <MaterialIcons
                    name="delete-outline"
                    onPress={() => {
                      deleteShotDB(editValue.id);
                      setEditButton(true);
                      setEditValue(shots[0]);
                    }}
                    size={60}
                    color={colors.darkRed}
                  />
                </View>
              )}
            </KeyboardAwareScrollView>
          )}
      {/* <EDIT DISPLAY ENDS HERE ***********************************************************> */}
      {/* <EMPTY BAG DISPALY ****************************************************************> */}
      {shots.length === 0 && !addDisplayOpen ? (
        <View style={styles.leftContainer}>
          <Text style={styles.emptyText}>Your bag is empty</Text>
        </View>
      ) : null}
      {/* <LOADING CONDITIONAL RENDER SCREEN ************************************************> */}
      {!editValue && (
        <View style={styles.leftContainer}>
          <Text style={styles.emptyText}>Loading...</Text>
          {updateState()}
        </View>
      )}
      {/* <RIGHT SIDE STARTS HERE ******************************************************** **> */}
      <ScrollView style={styles.rightContainer}>
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
            color={colors.darkRed}
            style={{ left: wp("1%") }}
          />
          {/* {console.log("shots at bottom:", shots)} */}
          {console.log("shots[0]:", shots[0])}
          {console.log("editValue:", editValue)}
        </View>
        {shots
          .sort((a, b) => b.max - a.max)
          .map((item) => (
            <View key={item.id} style={styles.clubElement}>
              <TouchableOpacity
                onPress={() => {
                  setEditValue(shots.filter((shot) => shot.id === item.id)[0]);
                  // filter the shots array down to single element set edit value with the [0]
                }}
              >
                <View style={styles.clubNameBox}>
                  <Text style={styles.elementText}>{item.club}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

export default BagScreenFormat;

const styles = StyleSheet.create({
  bagContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.darkBlack,
  },
  rightContainer: {
    width: wp("35%"),
    backgroundColor: colors.darkBlack,
    marginTop: hp("2%"),
  },
  leftContainer: {
    width: wp("65%"),
    backgroundColor: colors.darkBlack,
    marginTop: hp("2%"),
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
    color: colors.darkGold,
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
    backgroundColor: colors.darkBlue,
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

  editClubText: {
    textAlign: "center",
    fontSize: hp("20.5%"),
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
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
    backgroundColor: colors.darkBlue,
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
    color: colors.darkGold,
    fontFamily: "Roboto-regular",
  },
  picker: {
    height: hp("25%"),
    width: wp("50%"),
    fontSize: hp("10%"),
    borderRadius: 10,
    fontFamily: "Roboto-regular",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp("4%"),
    fontFamily: "Roboto-regular",
    textAlign: "center",
  },
  largeEditBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: hp("6%"),
    width: wp("38%"),
    borderRadius: 10,
    backgroundColor: colors.darkRed,
  },
});
