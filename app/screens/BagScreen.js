import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

const shots = [
  { club: "9 Iron", min: 140, max: 159 },
  { club: "8 Iron", min: 150, max: 164 },
  { club: "7 Iron", min: 165, max: 179 },
  { club: "6 Iron", min: 180, max: 200 },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf6f9",
  },
  box: {
    height: 100,
  },
  club: {
    flex: 1,
    flexDirection: "row",
    fontSize: 45,
    backgroundColor: "dodgerblue",
    padding: 10,
  },
});

const CreateBag = (props) => {
  for (const shot of shots) {
    return (
      <View style={styles.club}>
        <Text>{shot.club}</Text>
        <Text>MAX : {shot.max}</Text>
        <Text>MIN : {shot.min}</Text>
      </View>
    );
  }
};

export default function BagScreen(props) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Your Bag</Text>
        <CreateBag props={shots} />
      </View>
    </SafeAreaView>
  );
}
