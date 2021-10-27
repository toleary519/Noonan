import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    justifyContent: "space-around",
  },
  bottom: {
    flex: 2,
    justifyContent: "space-around",
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "space-around",
  },
  displays: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "powderblue",
  },
  functionals: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "dodgerblue",
  },
  clearButton: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },
  windEle: {
    flexDirection: "column",
    backgroundColor: "dodgerblue",
  },
  numbersOne: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "steelblue",
  },
  numbersTwo: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "tomato",
  },
  numbersThree: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "gold",
  },
  digit: {
    textAlign: "center",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  labelText: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  displayText: {
    textAlign: "center",
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
  },
  clearText: {
    textAlign: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  functionalText: {
    textAlign: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  zeroShot: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "green",
    marginBottom: 40,
  },
});

export default function ShootScreen(props) {
  const [distance, setDistance] = useState("");
  const [elevation, setElevation] = useState(0);
  const [wind, setWind] = useState(0);

  const handleDistance = (dig) => {
    setDistance(distance + dig);
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.labels}>
          <Text style={styles.labelText}>Distance</Text>
          <Text style={styles.labelText}>Elevation</Text>
          <Text style={styles.labelText}>Wind</Text>
        </View>
        <View style={styles.displays}>
          <Text style={styles.displayText}>{distance}</Text>
          <Text style={styles.displayText}>{elevation}</Text>
          <Text style={styles.displayText}>{wind}</Text>
        </View>
        <View style={styles.functionals}>
          <View style={styles.clearButton}>
            <Text onPress={handleClear} style={styles.clearText}>
              Clear
            </Text>
          </View>
          <View style={styles.windEle}>
            <Text onPress={handleEleUP} style={styles.functionalText}>
              Up
            </Text>
            <Text onPress={handleEleDWN} style={styles.functionalText}>
              Dwn
            </Text>
          </View>
          <View style={styles.windEle}>
            <Text onPress={handleWindUP} style={styles.functionalText}>
              Up
            </Text>
            <Text onPress={handleWindDWN} style={styles.functionalText}>
              Dwn
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.numbersOne}>
          <Text onPress={() => handleDistance("7")} style={styles.digit}>
            7
          </Text>
          <Text onPress={() => handleDistance("8")} style={styles.digit}>
            8
          </Text>
          <Text onPress={() => handleDistance("9")} style={styles.digit}>
            9
          </Text>
        </View>
        <View style={styles.numbersTwo}>
          <Text onPress={() => handleDistance("4")} style={styles.digit}>
            4
          </Text>
          <Text onPress={() => handleDistance("5")} style={styles.digit}>
            5
          </Text>
          <Text onPress={() => handleDistance("6")} style={styles.digit}>
            6
          </Text>
        </View>
        <View style={styles.numbersThree}>
          <Text onPress={() => handleDistance("1")} style={styles.digit}>
            1
          </Text>
          <Text onPress={() => handleDistance("2")} style={styles.digit}>
            2
          </Text>
          <Text onPress={() => handleDistance("3")} style={styles.digit}>
            3
          </Text>
        </View>
        <View style={styles.zeroShot}>
          <Text style={styles.digit}>0</Text>
          <Text style={styles.digit}>Get Shot</Text>
        </View>
      </View>
    </View>
  );
}
