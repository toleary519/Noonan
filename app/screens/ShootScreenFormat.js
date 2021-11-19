import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CalcButton from "../helpers/components/CalcButton";
import { ClearButton } from "../helpers/components/FuncButtons";
import { getClub } from "../helpers/calculator";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";
import { collection } from "firebase/firestore";
import { onSnapshot } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";

function ShootScreenFormat({ navigation }) {
  const [shots, setShots] = useState([]);
  const [distance, setDistance] = useState("");
  const [elevation, setElevation] = useState(0);
  const [wind, setWind] = useState(0);
  const [rough, setRough] = useState(false);
  const [sand, setSand] = useState(false);

  const db = getFirestore();

  // get shots from data base to set shots data array
  useEffect(() => {
    onSnapshot(collection(db, "shots"), (snapshot) =>
      setShots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  let actualDistance =
    Number(distance) + elevation + wind + (sand ? 3 : 0) + (rough ? 5 : 0);

  // passing both the actual distance and shots array in state to calculator function in helpers
  let execute = shots[0] ? getClub(actualDistance, shots) : null;

  console.log("actual distance:", actualDistance);

  const handleDistance = (stringDigit) => {
    distance.length === 3 ? null : setDistance(distance + stringDigit);
  };
  const handleEleUP = () => {
    setElevation(elevation + 1);
  };
  const handleEleDWN = () => {
    setElevation(elevation - 1);
  };
  const handleWindUP = () => {
    setWind(wind + 1);
  };
  const handleWindDWN = () => {
    setWind(wind - 1);
  };
  const handleClear = () => {
    setDistance("");
    setElevation(0);
    setWind(0);
    setRough(false);
    setSand(false);
  };

  return (
    <View style={styles.shootScreenContainer}>
      <View style={styles.shotDisplayContainer}>
        <View style={styles.shotDisplayWindow}>
          {distance > 1 ? (
            <View style={{ flexDirection: "row" }}>
              {/* <conditional render for in between clubs display> */}
              {execute.iBOne ? (
                <View style={styles.inBetweenDisplay}>
                  <Text
                    style={[styles.shotDisplayClubFont, { fontSize: hp("3%") }]}
                  >
                    {execute.iBMessage}
                  </Text>
                  <Text
                    style={[
                      styles.shotDisplayClubFont,
                      { fontSize: hp("3%"), marginTop: hp("1%") },
                    ]}
                  >
                    Crush a {execute.iBOne} or hit a soft {execute.iBTwo}
                  </Text>
                </View>
              ) : null}
              {/* <conditional render for outside of range under/over and standard display ****> */}
              {execute.message ? (
                <Text
                  style={[styles.shotDisplayClubFont, { fontSize: hp("4%") }]}
                >
                  {execute.message}
                </Text>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.shotDisplayClubFont}>{execute.club}</Text>
                  <Text style={styles.shotDisplayPercentFont}>
                    {execute.power}
                  </Text>
                  {!execute.message && !execute.iBMessage ? (
                    <Text style={styles.shotDisplayPercentSymbol}>%</Text>
                  ) : null}
                </View>
              )}
            </View>
          ) : (
            <Text style={[styles.shotDisplayClubFont, { fontSize: hp("4%") }]}>
              enter distance
            </Text>
          )}
        </View>
      </View>
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardLabelBox}>
          <Text style={styles.labelElement}>Distance</Text>
          <Text style={styles.labelElement}>Elevation</Text>
          <Text style={styles.labelElement}>Wind</Text>
        </View>
        <View style={styles.dashboardDisplayBox}>
          <View>
            {distance ? (
              <Text style={styles.displayElement}>{distance}</Text>
            ) : (
              <Text style={styles.displayElement}>0</Text>
            )}
          </View>

          <Text
            style={
              elevation > 0
                ? [styles.displayElement, { color: colors.darkRed }]
                : elevation < 0
                ? [styles.displayElement, { color: "#00C49A" }]
                : styles.displayElement
            }
          >
            {Math.abs(elevation)}
          </Text>

          <Text
            style={
              wind > 0
                ? [styles.displayElement, { color: colors.darkRed }]
                : wind < 0
                ? [styles.displayElement, { color: "#00C49A" }]
                : styles.displayElement
            }
          >
            {Math.abs(wind)}
          </Text>
        </View>
        <View style={styles.elevationBox}>
          <View style={[styles.elevationElement, { marginTop: hp("1%") }]}>
            <Feather
              size={hp("5%")}
              name="arrow-up-circle"
              onPress={handleEleUP}
              color={colors.darkGold}
            />
          </View>
          <View style={styles.elevationElement}>
            <MaterialCommunityIcons
              name="elevation-rise"
              size={hp("5%")}
              color={colors.darkGold}
            />
          </View>
          <View style={styles.elevationElement}>
            <Feather
              size={hp("5%")}
              name="arrow-down-circle"
              onPress={handleEleDWN}
              color={colors.darkGold}
            />
          </View>
        </View>
        <View style={styles.windBox}>
          <View style={[styles.windElement, { marginTop: hp("1%") }]}>
            <Feather
              size={hp("5%")}
              name="arrow-up-circle"
              onPress={handleWindDWN}
              color={colors.darkGold}
            />
          </View>
          <View style={styles.windElement}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={hp("5%")}
              color={colors.darkGold}
            />
          </View>
          <View style={styles.windElement}>
            <Feather
              size={hp("5%")}
              name="arrow-down-circle"
              onPress={handleWindUP}
              color={colors.darkGold}
            />
          </View>
        </View>
      </View>
      <View style={styles.clearContainer}>
        <View style={styles.clearButton}>
          <ClearButton onPress={handleClear} text="Clear" />
        </View>
      </View>
      <View style={styles.calcButtonContainer}>
        <View style={styles.calcButtonRow}>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("7")} text="7" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("8")} text="8" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("9")} text="9" />
          </View>
          <View style={sand ? styles.specialButton : styles.calcButton}>
            <CalcButton onPress={() => setSand(sand ? false : true)} text="S" />
          </View>
        </View>
        <View style={styles.calcButtonRow}>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("4")} text="4" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("5")} text="5" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("6")} text="6" />
          </View>
          <View style={rough ? styles.specialButton : styles.calcButton}>
            <CalcButton
              onPress={() => setRough(rough ? false : true)}
              text="R"
            />
          </View>
        </View>
        <View style={styles.calcButtonRow}>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("0")} text="0" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("1")} text="1" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("2")} text="2" />
          </View>
          <View style={styles.calcButton}>
            <CalcButton onPress={() => handleDistance("3")} text="3" />
          </View>
        </View>
      </View>
      {console.log("shots calc: ", shots)}
    </View>
  );
}

export default ShootScreenFormat;

const styles = StyleSheet.create({
  shootScreenContainer: {
    flex: 1,
    paddingTop: hp("5%"),
    backgroundColor: colors.darkBlack,
  },
  shotDisplayContainer: {
    // borderWidth: 1,
    // borderColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    width: wp("86%"),
    height: hp("15%"),
    left: wp("9%"),
    marginBottom: hp("3.5%"),
  },
  shotDisplayWindow: {
    // borderWidth: 1,
    // borderColor: colors.green,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: wp("86%"),
    height: hp("20%"),
    borderRadius: 10,
    marginTop: hp("1.5%"),
    marginLeft: wp("9%"),
    marginRight: wp("6%"),
  },
  shotDisplayClubFont: {
    textAlign: "center",
    marginRight: wp("6%"), //25
    fontSize: hp("10%"),
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
    textShadowOffset: { width: wp("-.3%"), height: hp(".3%") },
    textShadowRadius: 2,
    textShadowColor: colors.darkRed,
  },
  shotDisplayPercentFont: {
    textAlign: "center",
    paddingTop: hp("4.8%"),
    paddingLeft: wp("2.6"),
    paddingRight: wp("2.6"),
    fontSize: hp("6%"),
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
    textShadowOffset: { width: wp("-.3%"), height: hp(".3%") },
    textShadowRadius: 2,
    textShadowColor: colors.darkRed,
  },
  shotDisplayPercentSymbol: {
    textAlign: "center",
    paddingTop: hp("8.4%"),
    paddingRight: wp("1.6"),
    fontSize: hp("2%"),
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
    textShadowOffset: { width: wp("-.3%"), height: hp(".3%") },
    textShadowRadius: 2,
    textShadowColor: colors.darkRed,
  },
  dashboardContainer: {
    // borderWidth: 1,
    // borderColor: colors.green,
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("86%"),
    height: hp("20%"),
    left: wp("8%"),
  },
  dashboardLabelBox: {
    flexDirection: "column",
    height: wp("15%"),
    width: wp("26.3%"),
    marginTop: hp("2%"),
  },
  labelElement: {
    height: wp("14.6%"),
    width: wp("25.6%"),
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
  },
  dashboardDisplayBox: {
    flexDirection: "column",
    height: wp("15%"),
    width: wp("26%"),
    marginRight: wp("2%"),
  },
  displayElement: {
    height: wp("14.6%"),
    width: wp("25.6%"),
    fontSize: hp("4%"),
    textAlign: "center",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
  },
  elevationBox: {
    flexDirection: "column",
    width: wp("19.3%"),
  },
  windBox: {
    flexDirection: "column",
    width: wp("19.3%"),
  },
  elevationElement: {
    height: wp("14.6%"),
    width: wp("19.3%"),
    // marginTop: hp("1%"),
  },
  windElement: {
    height: wp("14.6%"),
    width: wp("19.3%"),
  },
  clearContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: hp("6%"),
    marginTop: hp("2.5%"),
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: colors.darkRed,
    width: wp("86%"),
    height: hp("5.5"),
    left: wp("8%"),
    borderRadius: 10,
  },
  calcButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: wp("86%"),
    left: wp("8%"),
  },
  calcButtonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  calcButton: {
    backgroundColor: colors.darkBlue,
    height: wp("17.6%"),
    width: wp("17.6%"),
    borderRadius: 10,
    marginTop: hp("2.4%"), //20
    marginLeft: wp("5.3%"), //20
    marginRight: wp("5.3%"), //20
    shadowOpacity: 0.7,
    shadowOffset: { width: wp("-.5%"), height: hp(".5%") },
    shadowRadius: 2,
    shadowColor: colors.darkRed,
  },
  specialButton: {
    backgroundColor: colors.darkRed,
    height: wp("17.6%"),
    width: wp("17.6%"),
    borderRadius: 10,
    marginTop: hp("2.4%"), //20
    marginLeft: wp("5.3%"), //20
    marginRight: wp("5.3%"), //20
    shadowOpacity: 0.7,
    shadowOffset: { width: wp("-.5%"), height: hp(".5%") },
    shadowRadius: 2,
    shadowColor: colors.darkRed,
  },
  font: {
    fontSize: hp("2.3%"), //19
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
  },
  inBetweenDisplay: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
