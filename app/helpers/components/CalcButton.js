import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../assets/colors/colors";

export default CalcButton = ({ text, onPress }) => (
  <TouchableOpacity>
    <Text onPress={onPress} style={styles.digit}>
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
    fontFamily: "Roboto-regular",
  },
});
