import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ClearButton = ({ text, onPress }) => (
  <TouchableOpacity>
    <Text onPress={onPress} style={styles.clearText}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  clearText: {
    width: wp("50%"),
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export { ClearButton };
