import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

export default function BagScreen(props) {
  return (
    <SafeAreaView>
      <View>
        <Text>Your Bag</Text>
        <View style={[styles.box, { backgroundColor: "powderblue" }]} />
        <View style={[styles.box, { backgroundColor: "dodgerblue" }]} />
        <View style={[styles.box, { backgroundColor: "steelblue" }]} />
        <View style={[styles.box, { backgroundColor: "tomato" }]} />
        <View style={[styles.box, { backgroundColor: "gold" }]} />
        <View style={[styles.box, { backgroundColor: "green" }]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  box: {
    height: 40,
    width: 100,
  },
});
