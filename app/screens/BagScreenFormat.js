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
  { key: 3, club: "PW", min: 81, max: 139, minPow: 50 },
  { key: 4, club: "9i", min: 140, max: 159, minPow: 50 },
  { key: 5, club: "8i", min: 150, max: 164, minPow: 50 },
  { key: 6, club: "7i", min: 165, max: 179, minPow: 50 },
  { key: 7, club: "6i", min: 180, max: 200, minPow: 50 },
  { key: 8, club: "6i", min: 180, max: 200, minPow: 50 },
  { key: 9, club: "6i", min: 180, max: 200, minPow: 50 },
  { key: 10, club: "6i", min: 180, max: 200, minPow: 50 },
  { key: 11, club: "6i", min: 180, max: 200, minPow: 50 },
  { key: 12, club: "6i", min: 180, max: 200, minPow: 50 },
  { key: 13, club: "6i", min: 180, max: 200, minPow: 50 },
  { key: 14, club: "6i", min: 180, max: 200, minPow: 50 },
];

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
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editDisplayOpen, setEditDisplayOpen] = useState(false);
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

  return (
    <ScrollView>
      <View style={styles.bagContainer}>
        {addModalOpen ? (
          <View style={styles.editContainer}>
            <View style={styles.editTopContainer}>
              <View style={styles.editClubNameContainer}>
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
            </View>
            <View style={styles.valuesContainer}>
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
              <View style={styles.valuesElement}>
                <TextInput
                  style={styles.editValuesText}
                  onChangeText={(text) => setAddClubPercent(text)}
                  value={addClubPercent}
                  placeholder={"% pow"}
                  keyboardType={"number-pad"}
                  textAlign={"center"}
                />
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
            <View style={styles.explinationContainer}>
              <View style={styles.explinationElement}>
                <Text style={styles.editValuesText}>explain</Text>
              </View>
              <View style={styles.explinationElement}>
                <Text style={styles.editValuesText}>explain</Text>
              </View>
              <View
                style={[styles.explinationElement, { borderRightWidth: 0 }]}
              >
                <Text style={styles.editValuesText}>explain</Text>
              </View>
            </View>
            <View style={styles.editExitBox}>
              <AntDesign
                name="save"
                onPress={() => {
                  saveNewClub(newClub);
                  console.log(shots);
                  addClearAll();
                  setAddModalOpen(false);
                }}
                size={60}
                color={colors.green}
                style={[{ left: wp("4%") }, { padding: hp("-1%") }]}
              />
              <Ionicons
                name="ios-exit-outline"
                onPress={() => {
                  setAddModalOpen(false);
                  addClearAll();
                }}
                size={60}
                color={colors.red}
                style={[{ left: wp("4%") }, { padding: hp("1%") }]}
              />
            </View>
          </View>
        ) : null}
        {editDisplayOpen ? null : (
          <View style={styles.topContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>bag</Text>
            </View>
            <View style={styles.addExitBox}>
              <Ionicons
                name="md-add-circle-outline"
                onPress={() => setAddModalOpen(true)}
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
          </View>
        )}
        {editDisplayOpen ? null : (
          <View style={styles.bottomContainer}>
            {shots.map((item) => (
              <View key={item.key} style={styles.clubElement}>
                <TouchableOpacity
                  onPress={() => {
                    setEditValue(shots[item.key]);
                    setEditDisplayOpen(true);
                    console.log("Outside - editValue:", editValue);
                  }}
                >
                  <View>
                    <View style={styles.clubNameBox}>
                      <Text style={styles.elementText}>{item.club}</Text>
                    </View>
                    <View style={styles.clubStatsBox}>
                      <View style={styles.statsMax}>
                        <MaterialCommunityIcons
                          name="speedometer"
                          size={24}
                          color="white"
                          style={{ paddingTop: 5 }}
                        />
                        <Text style={[styles.elementText, { paddingLeft: 5 }]}>
                          {item.max}
                        </Text>
                      </View>
                      <View style={styles.statsMin}>
                        <MaterialCommunityIcons
                          name="speedometer-slow"
                          size={24}
                          color="white"
                          style={{ paddingTop: 5 }}
                        />
                        <Text style={[styles.elementText, { paddingLeft: 5 }]}>
                          {item.min}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {/* <EDIT DISPLAY STARTS ****************************> */}
        {editDisplayOpen ? (
          <View style={styles.editContainer}>
            <View style={styles.editTopContainer}>
              <View style={styles.editClubNameContainer}>
                <Text style={styles.editClubText}>{editValue.club}</Text>
              </View>
            </View>
            <View style={styles.valuesContainer}>
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
            <View style={styles.explinationContainer}>
              <View style={styles.explinationElement}>
                <Text style={styles.editValuesText}>explain</Text>
              </View>
              <View style={styles.explinationElement}>
                <Text style={styles.editValuesText}>explain</Text>
              </View>
              <View
                style={[styles.explinationElement, { borderRightWidth: 0 }]}
              >
                <Text style={styles.editValuesText}>explain</Text>
              </View>
            </View>
            <View style={styles.editExitBox}>
              <AntDesign
                name="save"
                onPress={() => {
                  editClub(editValue);
                  editClearAll();
                  setEditDisplayOpen(false);
                }}
                size={60}
                color={colors.green}
                style={[{ left: wp("4%") }, { padding: hp("-1%") }]}
              />
              <Ionicons
                name="ios-exit-outline"
                onPress={() => {
                  setEditDisplayOpen(false);
                  editClearAll();
                }}
                size={60}
                color={colors.red}
                style={[{ left: wp("4%") }, { padding: hp("1%") }]}
              />
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

export default BagScreenFormat;

const styles = StyleSheet.create({
  bagContainer: {
    paddingTop: hp("8%"),
  },
  topContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: wp("66%"),
  },
  titleText: {
    textAlign: "left",
    fontSize: 90,
    paddingLeft: wp("8%"),
  },
  addExitBox: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: wp("34%"),
  },
  bottomContainer: {
    paddingTop: hp("4%"),
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  clubElement: {
    flexDirection: "column",
    height: hp("17%"),
    width: wp("33.33"),
    justifyContent: "center",
    alignItems: "center",
    padding: wp("8%"),
  },
  clubNameBox: {
    justifyContent: "center",
    alignItems: "center",
    height: hp("5%"),
    width: wp("22%"),
    left: wp("1.75%"),
    backgroundColor: colors.blue,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  clubStatsBox: {
    justifyContent: "center",
    alignItems: "center",
    height: hp("9%"),
    width: wp("25.5%"),
    borderRadius: 3,
    backgroundColor: colors.green,
  },
  elementText: {
    fontSize: hp("2.5%"),
  },
  statsMax: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    // padding,
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
  },
  editClubNameContainer: {
    flex: 1,
    justifyContent: "flex-start",
    height: hp("33%"),
    width: hp("66%"),
  },
  editClubText: {
    textAlign: "left",
    fontSize: hp("22.5%"),
    paddingLeft: wp("8%"),
  },
  editExitBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: hp("40%"),
    right: wp("10%"),
  },
  valuesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: hp("16%"),
    width: wp("85%"),
    left: wp("7.5%"),
  },
  valuesElement: {
    flexDirection: "column",
    justifyContent: "center",
    height: hp("12.5"),
    width: wp("25%"),
    backgroundColor: colors.blue,
    borderRadius: 8,
  },
  explinationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: hp("19%"),
  },
  explinationElement: {
    flexDirection: "column",
    justifyContent: "center",
    height: hp("16%"),
    width: wp("29%"),
    borderRadius: 10,

    backgroundColor: colors.green,
    borderRightWidth: 2,
    borderRightColor: colors.bg,
  },
  editValuesText: {
    textAlign: "center",
    fontSize: hp("2.5%"),
  },
  picker: {
    height: hp("25%"),
    width: wp("50%"),
    fontSize: hp("10%"),
  },
});
