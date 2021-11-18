import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function WelcomeScreen({ navigation }) {
  const [info, setInfo] = useState(false);
  const [qrCode, setQrCode] = useState(false);

  return (
    <View style={styles.container}>
      {!info && !qrCode ? (
        <View>
          <Text style={[styles.text, { fontSize: hp("13%") }]}>Noonan</Text>
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

            <TouchableOpacity onPress={() => setQrCode(true)}>
              <Text style={[styles.text, { fontSize: hp("4%") }]}>qr</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => firebase.auth().signOut()}>
              <Text style={[styles.text, { fontSize: hp("3%") }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {qrCode ? (
        <View style={styles.qrScreen}>
          <Text style={[styles.text, { fontSize: hp("4%") }]}>
            Scan at checkout
          </Text>
          <Image source={require("../assets/qrCode.png")} />
          <AntDesign
            onPress={() => setQrCode(false)}
            name="closecircleo"
            size={45}
            color={colors.darkBlue}
          />
        </View>
      ) : null}
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
  qrScreen: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.darkBlack,
  },
});
