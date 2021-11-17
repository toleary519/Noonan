import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../assets/colors/colors";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="colors.darkBlack" />

      <Text style={[styles.text, { fontSize: hp("10%") }]}>Noonan</Text>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Bag")}
          title="My Bag"
        >
          <Text style={styles.text}>My Bag</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Shoot")}
          title="Shoot!"
        >
          <Text style={styles.text}>Shoot</Text>
        </TouchableOpacity>

        <Text style={[styles.text, { fontSize: hp("4%") }]}>Info</Text>

        <TouchableOpacity onPress={() => firebase.auth().signOut()}>
          <Text style={[styles.text, { fontSize: hp("3%") }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.darkBlack,
  },
  text: {
    textAlign: "center",
    margin: hp("3%"),
    width: wp("100%"),
    fontSize: hp("8%"),
    color: colors.darkGold,
    fontFamily: "Yellow-tail",
  },
  noonan: {
    margin: hp("3%"),
    fontSize: hp("8%"),
    color: colors.darkGold,
  },
});
