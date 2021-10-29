import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf6f9",
  },
  box: {
    height: 100,
  },
  club: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 25,
    backgroundColor: "#edf6f9",
    padding: 10,
  },
});

const shots = [
  { club: "60", min: 5, max: 25, minPow: 50 },
  { club: "56", min: 26, max: 45, minPow: 50 },
  { club: "52", min: 46, max: 80, minPow: 50 },
  { club: "PW", min: 81, max: 139, minPow: 50 },
  { club: "9 Iron", min: 140, max: 159, minPow: 50 },
  { club: "8 Iron", min: 150, max: 164, minPow: 50 },
  { club: "7 Iron", min: 165, max: 179, minPow: 50 },
  { club: "6 Iron", min: 180, max: 200, minPow: 50 },
];

const CreateBag = () => {
  return shots.map((shot, i) => {
    return (
      <View key={i} style={styles.club}>
        <Text style={styles.club}>{shot.club}</Text>
        <Text style={styles.club}>MIN : {shot.min}</Text>
        <Text style={styles.club}>MAX : {shot.max}</Text>
      </View>
    );
  });
};

export default function BagScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.club}>Your Bag</Text>
      {CreateBag()}
    </View>
  );
}
