import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
import { getAuth, signOut } from "firebase/auth";

export default function WelcomeScreen({ navigation }) {
  const [info, setInfo] = useState(false);
  const [qrCode, setQrCode] = useState(false);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // successful sign-out.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {!info && !qrCode ? (
        <View>
          <Text
            style={[styles.text, { fontSize: hp("11%"), marginTop: hp("4%") }]}
          >
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
            <TouchableOpacity onPress={() => setInfo(true)}>
              <Text style={[styles.text, { fontSize: hp("4%") }]}>Info</Text>
            </TouchableOpacity>
            {/* <TouchableOpaity onPress={() => setQrCode(true)}>
              <Text style={[styles.text, { fontSize: hp("4%") }]}>qr</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => handleSignOut()}>
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
      {info ? (
        <ScrollView style={styles.scroll}>
          <View style={styles.textBlock}>
            <Text style={styles.titleText}> What is Noonan?</Text>
            <Text style={styles.bodyText}>
              Noonan is your caddy. It is designed to allow you to unlock the
              full potential of your clubs. Noonan consists of two major
              screens. Your Bag and The Calculator.{" "}
            </Text>
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.subtitleText}>Your Bag</Text>
            <Text style={styles.bodyText}>
              Start out with your bag. You can add, edit and delete clubs as you
              see fit. When adding clubs you will be asked to fill out three
              values.
            </Text>
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.subtitleText}>Maximum</Text>
            <Text style={styles.bodyText}>
              The max for each club is the distance that you hit that club with
              a full swing.
            </Text>
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.subtitleText}>Percent Power</Text>
            <Text style={styles.bodyText}>
              The percent power should be the lowest % that you would swing that
              particular club before you club down.
            </Text>
            <Text style={styles.bodyText}>
              This “spread” isn’t so impressive for clubs like driver and your
              woods, but grows as you progress through your irons and wedges.
            </Text>
            <Text style={[styles.subtitleText, { fontSize: hp("2%") }]}>~</Text>
            <Text style={styles.bodyText}>For example,</Text>
            <Text style={styles.bodyText}>
              Let’s say you hit your 9 iron 130 yds but with a 75% swing, “a
              soft 9,” it goes 110. Your input would be
            </Text>
            <Text style={[styles.bodyText, { fontSize: hp("1.8%") }]}>
              Max: 130 - % Power : 75 - Min: 110
            </Text>
            <Text style={[styles.subtitleText, { fontSize: hp("2%") }]}>~</Text>
            <Text style={styles.bodyText}>
              For a 56 degree wedge you may hit it 60 yds with a full swing and
              10 yds on a 20% swing.
            </Text>
            <Text style={[styles.bodyText, { fontSize: hp("1.8%") }]}>
              Max: 60 - % Power: 20 - Min: 10
            </Text>
            <View style={styles.textBlock}>
              <Text style={styles.subtitleText}>Minimum</Text>
              <Text style={styles.bodyText}>
                Like above, your Min distance is how far you hit that club with
                your most conservative swing.
              </Text>
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.subtitleText}>Other Things</Text>
              <Text style={styles.bodyText}>
                If you don’t know these numbers off the top of your head that is
                okay! Clubs can be updated by clicking on the edit button. You
                can do this on the fly and the calculator will adapt in
                realtime.
              </Text>
              <Text style={[styles.subtitleText, { fontSize: hp("2%") }]}>
                ~
              </Text>
              <Text style={styles.bodyText}>
                Make your best guess and if you realize on the range or course
                that you actually hit 10-15 yds further than you thought, great
                news! Change the values and let Noonan keep track.
              </Text>
              <Text style={styles.bodyText}>
                By doing this you will get a better sense of how dynamic your
                clubs really are. You can have a running tally of your ranges
                and play your game more effectively.
              </Text>
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.subtitleText}> The Calculator </Text>
              <Text style={styles.bodyText}>
                The calculator uses the information provided in your Bag to
                retrieve which club at which power you should hit for a given
                distance. This data is unique to you and your clubs.
              </Text>
              <Text style={styles.bodyText}>
                Use the keys at the bottom to enter the yardage. "S" indicates
                SAND and "R" indicates ROUGH.
              </Text>
              <Text style={styles.bodyText}>
                You can also adjust your estimated elevation and wind. Elevation
                up and down is in yds and wind is in mph.
              </Text>
              <Text style={[styles.bodyText, { fontSize: hp("1.8%") }]}>
                arrow down is head wind
              </Text>
              <Text style={[styles.bodyText, { fontSize: hp("1.8%") }]}>
                arrow up is tail wind
              </Text>

              <Text style={[styles.subtitleText, { fontSize: hp("2%") }]}>
                ~
              </Text>

              <Text style={styles.bodyText}> Give it a whirl.</Text>
            </View>
            <AntDesign
              onPress={() => setInfo(false)}
              name="closecircleo"
              size={45}
              color={colors.darkBlue}
              style={{ marginLeft: wp("45%"), marginVertical: hp("4%") }}
            />
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  // a lot of this needs to be cleaned up.
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  textBlock: {},
  titleText: {
    textAlign: "center",
    fontSize: hp("5%"),
    marginTop: hp("4%"),
    color: colors.darkGold,
    fontFamily: "Yellow-tail",
    textShadowOffset: { width: wp("-.3%"), height: hp(".3%") },
    textShadowRadius: 2,
    textShadowColor: colors.darkRed,
  },
  subtitleText: {
    textAlign: "center",
    color: colors.darkGold,
    fontSize: hp("4"),
    fontFamily: "Yellow-tail",
    textShadowOffset: { width: wp("-.3%"), height: hp(".3%") },
    textShadowRadius: 2,
    textShadowColor: colors.darkRed,
  },

  bodyText: {
    textAlign: "center",
    fontSize: hp("2.3%"),
    color: colors.bg,
    margin: hp("2%"),
    fontFamily: "Nunito-reg",
  },
});
