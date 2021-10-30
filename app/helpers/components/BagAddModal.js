import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default AddAClub = ({ text, onPress }) => (
  <TouchableOpacity delayPressIn={150}>
    <Text onPress={onPress} style={styles.add}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  add: {
    textAlign: "center",
    padding: 10,
    fontSize: 55,
    fontWeight: "bold",
    color: "#2f8587",
  },
});

<Modal visible={modalOpen} animationType="slide">
  <View style={}>
    <Text style={}>club</Text>
    <Text style={}>max</Text>
    <Text style={}>min</Text>
    <Text style={}>min-percent</Text>
    <CalcButton onPress={() => setModalOpen(false)} text="back" />
  </View>
</Modal>;
