import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../../assets/colors/colors";

const ClearButton = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.clearButton}>
      <Text style={styles.clearText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  clearText: {
    width: wp("50%"),
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: colors.darkRed,
    width: wp("86%"),
    height: hp("5.5"),
    left: wp("8%"),
    borderRadius: 10,
  },
});


export { ClearButton };
