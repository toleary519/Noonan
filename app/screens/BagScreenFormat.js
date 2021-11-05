import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";
import AddAClubButton from "../helpers/components/AddAClubButton";
import { colors } from "../assets/colors/colors";
import {
  MaterialCommunityIcons,
  EvilIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const shots = [
  { key: 0, club: "60", min: 5, max: 25, minPow: 50 },
  { key: 1, club: "56", min: 26, max: 45, minPow: 50 },
  { key: 2, club: "52", min: 46, max: 80, minPow: 50 },
  { key: 3, club: "PW", min: 81, max: 139, minPow: 50 },
  { key: 4, club: "9i", min: 140, max: 159, minPow: 50 },
  { key: 5, club: "8i", min: 150, max: 164, minPow: 50 },
  { key: 6, club: "7i", min: 165, max: 179, minPow: 50 },
  { key: 7, club: "6i", min: 180, max: 200, minPow: 50 },
];

const reset = { key: null, club: null, min: null, max: null, minPow: null };

function BagScreenFormat({ navigation }) {
  return (
    <View>
      <View style={styles.bagContainer}>
        <View style={styles.topContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>bag</Text>
          </View>
          <View style={styles.addExitBox}>
            <Ionicons
              name="md-add-circle-outline"
              size={40}
              color={colors.green}
            />
            <Ionicons
              name="ios-exit-outline"
              onPress={() => navigation.navigate("noonan")}
              size={40}
              color={colors.red}
              style={{ left: wp("1%") }}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          {shots.map((item) => (
            <View key={item.key} style={styles.clubElement}>
              <TouchableOpacity>
                <View style={styles.clubNameBox}>
                  <Text style={styles.elementText}>{item.club}</Text>
                </View>
                <View style={styles.clubStatsBox}>
                  <Text style={styles.elementText}>{item.max}</Text>
                  <Text style={styles.elementText}>{item.min}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default BagScreenFormat;

const styles = StyleSheet.create({
  bagContainer: {
    paddingTop: hp("8%"),
  },
  topContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: wp("66%"),
  },
  titleText: {
    textAlign: "left",
    fontSize: 90,
    paddingLeft: wp("8%"),
    // paddingBottom: hp("3%"),
  },
  addExitBox: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: wp("34%"),
  },
  bottomContainer: {
    paddingTop: hp("4%"),
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  clubElement: {
    flexDirection: "column",
    height: hp("17%"),
    width: wp("33.33"),
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  clubNameBox: {
    justifyContent: "center",
    alignItems: "center",
    height: hp("5%"),
    width: wp("22%"),
    left: wp("1.75%"),
    backgroundColor: colors.blue,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  clubStatsBox: {
    justifyContent: "center",
    alignItems: "center",
    height: hp("9%"),
    width: wp("25.5%"),
    borderRadius: 3,
    backgroundColor: colors.green,
  },
  elementText: {
    fontSize: hp("2.5%"),
  },
});
