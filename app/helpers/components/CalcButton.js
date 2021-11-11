import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../assets/colors/colors";

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
    fontFamily: "Roboto-regular",
  },
  special: {
    textAlign: "center",
    paddingTop: 4,
    fontSize: 40,
    fontWeight: "bold",
    color: colors.darkRed,
    fontFamily: "Roboto-regular",
  },
});
