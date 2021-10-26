import { Button, View, SafeAreaView, Text, StyleSheet } from "react-native";
import React from "react";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.options}>
        <Button onPress={() => navigation.navigate("Bag")} title="My Bag" />
        <Button onPress={() => navigation.navigate("Shoot")} title="Shoot!" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
