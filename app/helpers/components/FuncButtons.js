import React from "react";
import { Text, StyleSheet } from "react-native";

const FuncButton = ({ text }) => <Text style={styles.funcText}>{text}</Text>;

const ClearButton = ({ text }) => <Text style={styles.funcText}>{text}</Text>;

const styles = StyleSheet.create({
  funcText: {
    textAlign: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  clearText: {
    textAlign: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export { FuncButton, ClearButton };
