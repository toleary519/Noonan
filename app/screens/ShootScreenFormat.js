import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CalcButton from "../helpers/components/CalcButton";
import { ClearButton } from "../helpers/components/FuncButtons";
import { getClub, getSwings } from "../helpers/calculator";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";
import { collection } from "firebase/firestore";
import { onSnapshot, where } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

function ShootScreenFormat({ navigation }) {
  const [unOrderedShots, setUnOrderedShots] = useState([]);
  const [distance, setDistance] = useState("");
  const [elevation, setElevation] = useState(0);
  const [wind, setWind] = useState(0);
  const [rough, setRough] = useState(false);
  const [sand, setSand] = useState(false);

  // get user id
  const auth = getAuth();
  const user = auth.currentUser;
  const uID = user.uid;
  const db = getFirestore();

  let shots = [];
  // get shots from database to set shots data array
  useEffect(
    () => {
      onSnapshot(collection(db, `users/${uID}/shots`), (snapshot) =>
        setUnOrderedShots(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
    },
    // <Need to set editValue here ******************************>
    []
  );

  // sort the shots that come in from firebase
  unOrderedShots[0]
    ? (shots = unOrderedShots.sort((a, b) => a.min - b.min))
    : null;

  let actualDistance =
    Number(distance) + elevation + wind + (sand ? 3 : 0) + (rough ? 5 : 0);
  console.log("actual distance:", actualDistance);

  // passing both the actual distance and shots array in state to calculator function in helpers
  let execute = getClub(actualDistance, shots);
  let swings = getSwings(actualDistance, shots);

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
        {swings.length && swings.length > 1 ? (
          <Text style={[styles.enterDistanceFont, { fontSize: hp("3%") }]}>
            Two options ...
          </Text>
        ) : null}
        <View>
          {distance > 1 ? (
            <View style={{ flexDirection: "row" }}>
              {/* <conditional render for empty bag ********************************************************> */}
              {unOrderedShots.length === 0 ? (
                <Text style={styles.enterDistanceFont}>Your bag is empty</Text>
              ) : null}
              {/* <conditional render for in between clubs display ********************************************************> */}
              {execute.iBOne ? (
                <View style={styles.inBetweenDisplay}>
                  <Text
                    style={[styles.inBetweenClubsFont, { fontSize: hp("3%") }]}
                  >
                    {execute.iBMessage}
                  </Text>
                  <Text
                    style={[styles.inBetweenClubsFont, { marginTop: hp("1%") }]}
                  >
                    Crush a {execute.iBOne} or hit a soft {execute.iBTwo}
                  </Text>
                </View>
              ) : null}
              {/* <conditional render for outside of range under/over **************************************************> */}
              {execute.message ? (
                <Text
                  style={[styles.enterDistanceFont, { fontSize: hp("4%") }]}
                >
                  {execute.message}
                </Text>
              ) : null}
              {/* <SWING DISPLAY FOR 2 SHOTS ***************************************************************************> */}
              {swings.length && swings.length > 1 ? (
                <View style={styles.multiShotDisplay}>
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
                    <Text style={styles.multiShotDisplayFont}>
                      {swings[0].club}
                    </Text>
                    <Text style={styles.multiShotDisplayPercentFont}>
                      {swings[0].power}
                      <Text style={styles.shotDisplayPercentSymbol}>%</Text>
                    </Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
                    <Text style={styles.multiShotDisplayFont}>
                      {swings[1].club}
                    </Text>
                    <Text style={styles.multiShotDisplayPercentFont}>
                      {swings[1].power}
                      <Text style={styles.shotDisplayPercentSymbol}>%</Text>
                    </Text>
                  </View>
                </View>
              ) : swings.length ? (
                // {/* <SWING DISPLAY FOR A SINGLE SHOT ***************************************************************************> */}
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.shotDisplayClubFont}>
                    {swings[0].club}
                  </Text>
                  <Text style={styles.shotDisplayPercentFont}>
                    {swings[0].power}
                    <Text style={styles.shotDisplayPercentSymbol}>%</Text>
                  </Text>
                </View>
              ) : null}
            </View>
          ) : (
            // <CONDITIONAL RENDER FOR THE STARTING SCREEN WITH NO DISTANCE *****************************************************************>
            <Text style={styles.enterDistanceFont}>enter distance</Text>
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
            <CalcButton
              onPress={() => {
                setSand(sand ? false : true);
                setRough(false);
              }}
              text="S"
            />
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
              onPress={() => {
                setRough(rough ? false : true);
                setSand(false);
              }}
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
      {console.log("swings calc *******:", swings)}
      {console.log(
        "render end **********************************************:"
      )}
    </View>
  );
}

export default ShootScreenFormat;

const styles = StyleSheet.create({
  shootScreenContainer: {
    flex: 1,
    paddingTop: hp("2%"),
    backgroundColor: colors.darkBlack,
  },
  shotDisplayContainer: {
    // borderWidth: 1,
    // borderColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    // width: wp("86%"),
    height: hp("24%"),
    // left: wp("9%"),
    // marginBottom: hp("3.5%"),
  },
  // shotDisplayWindow: {
  //   borderWidth: 1,
  //   borderColor: colors.green,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: wp("86%"),
  //   height: hp("20%"),
  //   borderRadius: 10,
  //   marginTop: hp("1.5%"),
  //   marginLeft: wp("9%"),
  //   marginRight: wp("6%"),
  // },
  shotDisplayClubFont: {
    // textAlign: "center",
    marginRight: wp("6%"), //25
    fontSize: hp("10%"),
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
    textShadowOffset: { width: wp("-.3%"), height: hp(".3%") },
    textShadowRadius: 2,
    textShadowColor: colors.darkRed,
  },
  enterDistanceFont: {
    // textAlign: "center",
    fontSize: hp("4%"),
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
    textShadowOffset: { width: wp("-.3%"), height: hp(".3%") },
    textShadowRadius: 2,
    textShadowColor: colors.darkRed,
  },
  shotDisplayPercentFont: {
    textAlign: "center",
    // paddingTop: hp("4.8%"),
    // paddingLeft: wp("2.6"),
    // paddingRight: wp("2.6"),
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
  // dashboardDisplayBox: {
  //   borderWidth: 1,
  //   borderColor: colors.darkRed,
  //   flexDirection: "column",
  //   height: wp("15%"),
  //   width: wp("26%"),
  //   marginRight: wp("2%"),
  // },
  displayElement: {
    // borderWidth: 1,
    // borderColor: colors.darkRed,
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
    // borderWidth: 1,
    // borderColor: colors.green,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inBetweenClubsFont: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
    textShadowOffset: { width: wp("-.2%"), height: hp(".2%") },
    textShadowRadius: 2,
    textShadowColor: colors.darkRed,
  },
  multiShotDisplay: {
    // borderWidth: 1,
    // borderColor: colors.darkGold,
    alignItems: "center",
  },
  multiShotDisplayFont: {
    // borderWidth: 1,
    // borderColor: colors.red,
    marginRight: wp("6%"), //25
    height: hp("9%"),
    fontSize: hp("6%"),
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
    textShadowOffset: { width: wp("-.2%"), height: hp(".2%") },
    textShadowRadius: 2,
    textShadowColor: colors.darkRed,
  },
  multiShotDisplayPercentFont: {
    // borderWidth: 1,
    // borderColor: colors.green,
    textAlign: "center",
    paddingLeft: wp("2.6"),
    paddingRight: wp("2.6"),
    height: hp("7%"),
    fontSize: hp("3%"),
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
    color: colors.darkGold,
    textShadowOffset: { width: wp("-.2%"), height: hp(".2%") },
    textShadowRadius: 2,
    textShadowColor: colors.darkRed,
  },
});
