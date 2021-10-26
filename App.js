import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native"; //components

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>noonan!</Text>
      <View style={styles.options}>
        <Text style={styles.options}>Bag!</Text>
        <Text style={styles.options}>Shoot!</Text>
      </View>
      <StatusBar style="auto" />
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
