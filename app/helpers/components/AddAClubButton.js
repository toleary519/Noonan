import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default AddAClubButton = ({ text, onPress }) => (
  <TouchableOpacity delayPressIn={150}>
    <Text onPress={onPress} style={styles.add}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  add: {
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#2f8587",
  },
});
