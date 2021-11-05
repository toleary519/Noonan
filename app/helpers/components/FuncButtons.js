import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const ClearButton = ({ text, onPress }) => (
  <TouchableOpacity>
    <Text onPress={onPress} style={styles.clearText}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  clearText: {
    width: 200,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export { ClearButton };
