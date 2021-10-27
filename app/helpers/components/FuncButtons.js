import React from "react";
import { Text, StyleSheet, Button } from "react-native";

const FuncButton = ({ title }) => (
  <Button style={styles.funcText} title={title} />
);

const ClearButton = ({ title }) => (
  <Button style={styles.funcText} title={title} />
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
