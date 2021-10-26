import React from "react";
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
  zeroShot: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 35,
    backgroundColor: "green",
  },
});

export default function ShootScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.labels}>
          <Text>Distance</Text>
          <Text>Elevation</Text>
          <Text>Wind</Text>
        </View>
        <View style={styles.displays}>
          <Text>Dis Display</Text>
          <Text>Ele Display</Text>
          <Text>Win Display</Text>
        </View>
        <View style={styles.functionals}>
          <Text>Clear</Text>
          <View style={styles.windEle}>
            <Text>Up</Text>
            <Text>Dwn</Text>
          </View>
          <View style={styles.windEle}>
            <Text>Up</Text>
            <Text>Dwn</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.numbersOne}>
          <Text>7</Text>
          <Text>8</Text>
          <Text>9</Text>
        </View>
        <View style={styles.numbersTwo}>
          <Text>4</Text>
          <Text>5</Text>
          <Text>6</Text>
        </View>
        <View style={styles.numbersThree}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
        <View style={styles.zeroShot}>
          <Text>0</Text>
          <Text>Get Shot</Text>
        </View>
      </View>
    </View>
  );
}
