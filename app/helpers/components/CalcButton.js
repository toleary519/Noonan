import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default CalcButton = ({ text, onPress }) => (
  <TouchableOpacity delayPressIn={150}>
    <Text onPress={onPress} style={styles.digit}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  digit: {
    textAlign: "center",
    padding: 10,
    fontSize: 55,
    fontWeight: "bold",
    color: "#2f8587",
  },
});
