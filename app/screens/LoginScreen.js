import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../assets/colors/colors";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("WelcomeScreen");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Noonan</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.darkBlack,
  },
  titleContainer: {
    // borderWidth: 1,
    // borderColor: colors.green,
    marginTop: hp("8%"),
    width: wp("100%"),
    height: hp("25%"),
  },
  titleText: {
    textAlign: "center",
    fontSize: hp("10%"),
    fontFamily: "Yellow-tail",
    color: colors.darkGold,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    alignItems: "center",
    backgroundColor: colors.input,
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("1%"),
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("3%"),
  },
  button: {
    backgroundColor: colors.darkBlue,
    width: "100%",
    padding: wp("3%"),
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: colors.green,
    marginTop: 5,

    borderWidth: 2,
  },
  buttonText: {
    color: colors.darkBlack,
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: colors.darkBlack,
    fontWeight: "700",
    fontSize: 16,
  },
});
