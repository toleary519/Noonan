import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import CalcButton from "../helpers/components/CalcButton";
import { FuncButton, ClearButton } from "../helpers/components/FuncButtons";
import { getClub } from "../helpers/calculator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf0da",
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
    alignItems: "center",
  },
  clearButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  windEle: {
    flexDirection: "column",
  },
  numbers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  labelText: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C0F13",
  },
  displayText: {
    flex: 1,
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
    color: "green",
  },
  modalDisplay: {
    marginTop: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C0F13",
  },
});

const shots = [
  { club: "9 Iron", min: 140, max: 159 },
  { club: "8 Iron", min: 150, max: 164 },
  { club: "7 Iron", min: 165, max: 179 },
  { club: "6 Iron", min: 180, max: 200 },
];

export default function ShootScreen(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [distance, setDistance] = useState("");
  const [elevation, setElevation] = useState(0);
  const [wind, setWind] = useState(0);
  let actualDistance = Number(distance) + elevation + wind;

  let execute = getClub(actualDistance);

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
        <Modal visible={modalOpen}>
          <View style={styles.modalDisplay}>
            <Text style={styles.modalText}>{execute.club}</Text>
            <Text style={styles.modalText}>{execute.power}</Text>
            <CalcButton onPress={() => setModalOpen(false)} text="back" />
          </View>
        </Modal>
        <View style={styles.functionals}>
          <View style={styles.clearButton}>
            <ClearButton onPress={handleClear} text="Clear" />
          </View>
          <View style={styles.windEle}>
            <FuncButton onPress={handleEleUP} text="Up" />
            <FuncButton onPress={handleEleDWN} text="Dwn" />
          </View>
          <View style={styles.windEle}>
            <FuncButton onPress={handleWindUP} text="Up" />
            <FuncButton onPress={handleWindDWN} text="Dwn" />
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.numbers}>
          <CalcButton onPress={() => handleDistance("7")} text="7" />
          <CalcButton onPress={() => handleDistance("8")} text="8" />
          <CalcButton onPress={() => handleDistance("9")} text="9" />
          <CalcButton text="S" />
        </View>
        <View style={styles.numbers}>
          <CalcButton onPress={() => handleDistance("4")} text="4" />
          <CalcButton onPress={() => handleDistance("5")} text="5" />
          <CalcButton onPress={() => handleDistance("6")} text="6" />
          <CalcButton text="R" />
        </View>
        <View style={styles.numbers}>
          <CalcButton onPress={() => handleDistance("0")} text="0" />
          <CalcButton onPress={() => handleDistance("1")} text="1" />
          <CalcButton onPress={() => handleDistance("2")} text="2" />
          <CalcButton onPress={() => handleDistance("3")} text="3" />
        </View>
        <View style={styles.zeroShot}>
          <CalcButton onPress={() => setModalOpen(true)} text="Get Shot" />
        </View>
      </View>
    </View>
  );
}
