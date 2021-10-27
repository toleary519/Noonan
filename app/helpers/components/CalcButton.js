import React from "react";
import { Text, StyleSheet } from "react-native";

export default CalcButton = ({ text }) => (
  <Text style={styles.digit}>{text}</Text>
);

const styles = StyleSheet.create({
  digit: {
    textAlign: "center",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});
