import { Button, View, SafeAreaView, Text, StyleSheet } from "react-native";
import React from "react";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("Bag")} title="My Bag" />
      <Button onPress={() => navigation.navigate("Shoot")} title="Shoot!" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#edf6f9",
    fontSize: 55,
  },
});
