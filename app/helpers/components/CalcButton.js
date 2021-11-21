import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../../assets/colors/colors";

export default CalcButton = ({ text, onPress, sand, rough }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={sand || rough ? styles.specialButton : styles.calcButton}>
      <Text style={styles.digit}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  digit: {
    textAlign: "center",
    paddingTop: 4,
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Roboto-regular",
  },
  calcButton: {
    backgroundColor: colors.darkBlue,
    height: wp("17.6%"),
    width: wp("17.6%"),
    borderRadius: 10,
    marginTop: hp("2.4%"), //20
    marginLeft: wp("5.3%"), //20
    marginRight: wp("5.3%"), //20
    shadowOpacity: 0.7,
    shadowOffset: { width: wp("-.5%"), height: hp(".5%") },
    shadowRadius: 2,
    shadowColor: colors.darkRed,
  },
  specialButton: {
    backgroundColor: colors.darkRed,
    height: wp("17.6%"),
    width: wp("17.6%"),
    borderRadius: 10,
    marginTop: hp("2.4%"), //20
    marginLeft: wp("5.3%"), //20
    marginRight: wp("5.3%"), //20
    shadowOpacity: 0.7,
    shadowOffset: { width: wp("-.5%"), height: hp(".5%") },
    shadowRadius: 2,
    shadowColor: colors.darkRed,
  },
});
