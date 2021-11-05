import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CalcButton from "../helpers/components/CalcButton";
import { ClearButton } from "../helpers/components/FuncButtons";
import { getClub } from "../helpers/calculator";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";

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

function ShootScreenFormat({ navigation }) {
  const [distance, setDistance] = useState("");
  const [elevation, setElevation] = useState(0);
  const [wind, setWind] = useState(0);
  const [rough, setRough] = useState(false);
  const [sand, setSand] = useState(false);

  let actualDistance =
    Number(distance) + elevation + wind + (sand ? 3 : 0) + (rough ? 5 : 0);
  let execute = getClub(actualDistance);

  console.log("actual distance:", actualDistance);

  const handleDistance = (stringDigit) => {
    setDistance(distance + stringDigit); // if this is broken put back to "dig"
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
      <Ionicons
        name="arrow-back"
        onPress={() => navigation.navigate("noonan")}
        size={24}
        color="black"
      />
      <View style={styles.shotDisplayContainer}>
        <View style={styles.shotDisplayWindow}>
          {distance > 5 ? (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.shotDisplayFont}>{execute.club}</Text>
              <Text style={styles.shotDisplayFont}>{execute.power}</Text>
            </View>
          ) : (
            <Text style={styles.shotDisplayFont}>Noonan</Text>
          )}
        </View>
      </View>
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardLabelBox}>
          <View style={styles.dashboardElement}>
            <Text style={styles.font}>Distance</Text>
          </View>
          <View style={styles.dashboardElement}>
            <Text style={styles.font}>Elevation</Text>
          </View>
          <View style={styles.dashboardElement}>
            <Text style={styles.font}>Wind</Text>
          </View>
        </View>
        <View style={styles.dashboardDisplayBox}>
          <View style={styles.dashboardElement}>
            {distance ? (
              <Text style={(styles.font, { fontSize: 25 })}>{distance}</Text>
            ) : (
              <Text style={(styles.font, { fontSize: 25 })}>0</Text>
            )}
          </View>
          <View style={styles.dashboardElement}>
            <Text style={(styles.font, { fontSize: 25 })}>{elevation}</Text>
          </View>
          <View style={styles.dashboardElement}>
            <Text style={(styles.font, { fontSize: 25 })}>{wind}</Text>
          </View>
        </View>
        <View style={styles.elevationBox}>
          <View style={styles.dashboardElement}>
            <Feather size={45} name="arrow-up-circle" onPress={handleEleUP} />
          </View>
          <View style={styles.dashboardElement}>
            {/* <Foundation name="mountains" size={45} color="black" /> */}
            <MaterialCommunityIcons
              name="elevation-rise"
              size={38}
              color="black"
            />
          </View>
          <View style={styles.dashboardElement}>
            <Feather
              size={45}
              name="arrow-down-circle"
              onPress={handleEleDWN}
            />
          </View>
        </View>
        <View style={styles.windBox}>
          <View style={styles.dashboardElement}>
            <Feather
              size={45}
              name="arrow-down-circle"
              onPress={handleWindUP}
            />
          </View>
          <View style={styles.dashboardElement}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={38}
              color="black"
            />
          </View>
          <View style={styles.dashboardElement}>
            <Feather size={45} name="arrow-up-circle" onPress={handleWindDWN} />
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
          <View style={styles.calcButton}>
            <CalcButton
              onPress={() => setSand(sand ? false : true)}
              special={sand}
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
          <View style={styles.calcButton}>
            <CalcButton
              onPress={() => setRough(rough ? false : true)}
              special={rough}
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
    </View>
  );
}

export default ShootScreenFormat;

const styles = StyleSheet.create({
  shootScreenContainer: {
    backgroundColor: colors.bg,
    paddingTop: 40,
  },
  shotDisplayContainer: {
    flex: 2,
  },
  shotDisplayWindow: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    width: 314,
    height: 93,
    top: 26,
    left: 31,
    borderRadius: 10,
  },
  shotDisplayFont: {
    textAlign: "center",
    paddingTop: 4,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: colors.bg,
  },
  dashboardContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 314,
    top: 137,
    left: 31,
  },
  dashboardLabelBox: {
    flexDirection: "column",
  },
  dashboardDisplayBox: {
    flexDirection: "column",
  },
  // elevationBox: {
  //   flexDirection: "column",
  // },
  // windBox: {
  //   flexDirection: "column",
  // },
  dashboardElement: {
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: 55,
    borderRadius: 10,
    margin: 10,
  },
  // elevationElement: {},
  // windElement: {},
  clearContainer: {
    flex: 1,
    flexDirection: "row",
    height: 65,
  },
  clearButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: colors.red,
    width: 314,
    height: 44,
    top: 372,
    left: 31,
    borderRadius: 10,
  },
  calcButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: 314,
    top: 425,
    left: 31,
  },
  calcButtonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  calcButton: {
    backgroundColor: colors.brown,
    height: 55,
    width: 55,
    borderRadius: 10,
    margin: 10,
  },
  font: {
    fontSize: 18,
    textAlign: "center",
  },
});
