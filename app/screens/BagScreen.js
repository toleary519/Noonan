import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: 100,
  },
});

export default function BagScreen(props) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
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
