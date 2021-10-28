import React from "react";
import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

const FuncButton = ({ text }) => (
  <TouchableOpacity>
    <Text style={styles.funcText}>{text}</Text>
  </TouchableOpacity>
);

const ClearButton = ({ text }) => (
  <TouchableOpacity>
    <Text style={styles.funcText}>{text}</Text>
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
});

export { FuncButton, ClearButton };
