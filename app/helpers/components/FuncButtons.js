import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const FuncButton = ({ text }) => (
  <Pressable>
    <Text style={styles.funcText}>{text}</Text>
  </Pressable>
);

const ClearButton = ({ text }) => (
  <Pressable>
    <Text style={styles.funcText}>{text}</Text>
  </Pressable>
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
