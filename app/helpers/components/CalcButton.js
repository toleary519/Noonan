import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default CalcButton = ({ text, onPress, special }) => (
  <TouchableOpacity delayPressIn={150}>
    <Text onPress={onPress} style={special ? styles.special : styles.digit}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  digit: {
    // borderWidth: 1,
    textAlign: "center",
    padding: 10,
    fontSize: 55,
    fontWeight: "bold",
    color: "#2f8587",
  },
  special: {
    textAlign: "center",
    padding: 10,
    fontSize: 55,
    fontWeight: "bold",
    color: "#FC440F",
  },
});
