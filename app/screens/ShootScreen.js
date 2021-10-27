import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import CalcButton from "../helpers/components/CalcButton";
import { FuncButton, ClearButton } from "../helpers/components/FuncButtons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF8EE",
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
  },
  functionals: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  clearButton: {
    flexDirection: "column",
    justifyContent: "center",
  },
  windEle: {
    flexDirection: "column",
  },
  numbers: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  labelText: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C0F13",
  },
  displayText: {
    textAlign: "center",
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "#1C0F13",
  },
  zeroShot: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
});

export default function ShootScreen(props) {
  const [distance, setDistance] = useState("0");
  const [elevation, setElevation] = useState(0);
  const [wind, setWind] = useState(0);

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
    setDistance("0");
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
            <ClearButton onPress={handleClear} title="Clear" />
          </View>
          <View style={styles.windEle}>
            <FuncButton onPress={handleEleUP} title="Up" />
            <FuncButton onPress={handleEleDWN} title="Dwn" />
          </View>
          <View style={styles.windEle}>
            <FuncButton onPress={handleWindUP} title="Up" />
            <FuncButton onPress={handleWindDWN} title="Dwn" />
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.numbers}>
          <CalcButton text="9" />
          <CalcButton text="8" />
          <CalcButton text="7" />
          <CalcButton text="S" />
        </View>
        <View style={styles.numbers}>
          <CalcButton text="6" />
          <CalcButton text="5" />
          <CalcButton text="4" />
          <CalcButton text="R" />
        </View>
        <View style={styles.numbers}>
          <CalcButton text="3" />
          <CalcButton text="2" />
          <CalcButton text="1" />
          <CalcButton text="0" />
        </View>
        <View style={styles.zeroShot}>
          <CalcButton text="Get Shot" />
        </View>
      </View>
    </View>
  );
}
