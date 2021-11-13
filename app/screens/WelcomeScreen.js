import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
      <Text style={[styles.text, { justifyContent: "flex-start" }]}>
        Noonan
      </Text>
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

        <TouchableOpacity onPress={() => firebase.auth().signOut()}>
          <Text
            style={[
              styles.text,
              { marginBottom: hp("14%"), fontSize: hp("4%") },
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.darkBlack,
  },
  text: {
    textAlign: "center",
    margin: hp("3%"),
    fontSize: hp("8%"),
    color: colors.darkGold,
    fontFamily: "Roboto-regular",
  },
  noonan: {
    margin: hp("3%"),
    fontSize: hp("8%"),
    color: colors.darkGold,
  },
});
