import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";

function Bag(props) {
  return (
    <SafeAreaView>
      <View>
        <Text> Your Bag </Text>
        <View style={(styles.box, { backgroundColor: "powderblue" })} />
        <View style={(styles.box, { backgroundColor: "dodgerblue" })} />
        <View style={(styles.box, { backgroundColor: "steelblue" })} />
        <View style={(styles.box, { backgroundColor: "tomato" })} />
        <View style={(styles.box, { backgroundColor: "gold" })} />
        <View style={(styles.box, { backgroundColor: "green" })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 40,
    width: 40,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Bag;
