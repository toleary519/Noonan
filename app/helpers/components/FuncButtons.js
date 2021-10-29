import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const FuncButton = ({ text, onPress }) => (
  <TouchableOpacity>
    <Text onPress={onPress} style={styles.funcText}>
      {text}
    </Text>
  </TouchableOpacity>
);

const ClearButton = ({ text, onPress }) => (
  <TouchableOpacity>
    <Text onPress={onPress} style={styles.clearText}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  funcText: {
    textAlign: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#1C0F13",
  },
  clearText: {
    textAlign: "center",
    padding: 10,
    fontSize: 35,
    fontWeight: "bold",
    color: "tomato",
  },
});

export { FuncButton, ClearButton };
