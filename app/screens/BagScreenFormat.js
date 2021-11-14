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
import { addShotDB } from "../api/firebaseFunct";
import { collection } from "firebase/firestore";
import { onSnapshot } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";

const load = {
  club: "load...",
  min: "load...",
  max: "load...",
  minPow: "load...",
};

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
  const [shots, setShots] = useState([load]);

  // establish the db for useEffect below
  const db = getFirestore();

  // get the entire shots collection from firestore and map them to shots state,
  // also pulling out the doc id to use as key below
  useEffect(
    () =>
      onSnapshot(collection(db, "shots"), (snapshot) =>
        setShots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const [addDisplayOpen, setAddDisplayOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState(pickerClubs[0]);
  const [editValue, setEditValue] = useState(shots[0] || { ...load });
  const [addClubMin, setAddClubMin] = useState(null);
  const [addClubMax, setAddClubMax] = useState(null);
  const [addClubPercent, setAddClubPercent] = useState(null);
  const [editClubMin, setEditClubMin] = useState(null);
  const [editClubMax, setEditClubMax] = useState(null);
  const [editClubPercent, setEditClubPercent] = useState(null);

  let newDBclub = {
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
      {addDisplayOpen || shots.length === 0 ? null : (
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
            <MaterialIcons
              name="delete-outline"
              onPress={() => {
                deleteAClub();
                editClearAll();
              }}
              size={60}
              color={colors.darkRed}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
      {/* <EDIT DISPLAY ENDS HERE ***********************************************************> */}
      {/* <EMPTY BAG DISPALY **************************************************> */}
      {shots.length === 0 && !addDisplayOpen ? (
        <View style={styles.leftContainer}>
          <Text style={styles.emptyText}>Your bag is empty</Text>
        </View>
      ) : null}
      {/* {!editValue && shots.length !== 0 ? (
        <View style={styles.leftContainer}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      ) : null} */}
      {/* <RIGHT SIDE STARTS HERE ****************************************************************> */}
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
          {console.log("shots at bottom:", shots)}
        </View>

        {shots.map((item) => (
          <View key={item.id} style={styles.clubElement}>
            <TouchableOpacity
              onPress={() => {
                // console.log("editValue:", editValue);
                setEditValue(shots.filter((shot) => shot.id === item.id)[0]);
                // filter the shots array down to single element set edit value with the [0]
                console.log("filtered shot:", editValue);
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
});
