import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default CalcButton = ({ text, onPress, special }) => (
  <TouchableOpacity>
    <Text onPress={onPress} style={special ? styles.special : styles.digit}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  digit: {
    textAlign: "center",
    paddingTop: 4,
    fontSize: 40,
    fontWeight: "bold",
  },
  special: {
    textAlign: "center",
    paddingTop: 4,
    fontSize: 40,
    fontWeight: "bold",
    color: "#FC440F",
  },
});
