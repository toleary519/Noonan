import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function ShootScreen(props) {
  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <Text>SHOOT YOUR SHOT</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    backgroundColor: "dodgerblue",
  },
});
