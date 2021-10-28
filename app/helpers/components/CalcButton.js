import React from "react";
import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

export default CalcButton = ({ text }) => (
  <TouchableOpacity>
    <Text style={styles.digit}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  digit: {
    textAlign: "center",
    padding: 10,
    fontSize: 55,
    fontWeight: "bold",
    color: "#1C0F13",
  },
});
