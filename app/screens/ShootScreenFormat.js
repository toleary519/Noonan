import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import CalcButton from "../helpers/components/CalcButton";
// import { FuncButton, ClearButton } from "../helpers/components/FuncButtons";
import { getClub } from "../helpers/calculator";
import { Feather } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";

function ShootScreenFormat(props) {
  return (
    <View style={styles.shootScreenContainer}>
      <View style={styles.shotDisplayContainer}>
        <View style={styles.shotDisplayWindow}></View>
      </View>
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardLabelBox}>
          <View style={styles.dashboardElement}></View>
          <View style={styles.dashboardElement}></View>
          <View style={styles.dashboardElement}></View>
        </View>
        <View style={styles.dashboardDisplayBox}>
          <View style={styles.dashboardElement}></View>
          <View style={styles.dashboardElement}></View>
          <View style={styles.dashboardElement}></View>
        </View>
        <View style={styles.elevationBox}>
          <View style={styles.dashboardElement}></View>
          <View style={styles.dashboardElement}></View>
          <View style={styles.dashboardElement}></View>
        </View>
        <View style={styles.windBox}>
          <View style={styles.dashboardElement}></View>
          <View style={styles.dashboardElement}></View>
          <View style={styles.dashboardElement}></View>
        </View>
      </View>
      <View style={styles.clearContainer}>
        <View style={styles.clearButton}>
          <Text style={styles.font}>Clear</Text>
        </View>
      </View>
      <View style={styles.calcButtonContainer}>
        <View style={styles.calcButtonRow}>
          <View style={styles.calcButton}></View>
          <View style={styles.calcButton}></View>
          <View style={styles.calcButton}></View>
          <View style={styles.calcButton}></View>
        </View>
        <View style={styles.calcButtonRow}>
          <View style={styles.calcButton}></View>
          <View style={styles.calcButton}></View>
          <View style={styles.calcButton}></View>
          <View style={styles.calcButton}></View>
        </View>
        <View style={styles.calcButtonRow}>
          <View style={styles.calcButton}></View>
          <View style={styles.calcButton}></View>
          <View style={styles.calcButton}></View>
          <View style={styles.calcButton}></View>
        </View>
      </View>
    </View>
  );
}

export default ShootScreenFormat;

const styles = StyleSheet.create({
  shootScreenContainer: {
    backgroundColor: colors.bg,
  },
  shotDisplayContainer: {
    flex: 2,
  },
  shotDisplayWindow: {
    position: "absolute",
    backgroundColor: colors.green,
    width: 314,
    height: 93,
    top: 26,
    left: 31,
    borderRadius: 10,
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
    backgroundColor: colors.blue,
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
