import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import BagScreenFormat from "./app/screens/BagScreenFormat";
import ShootScreenFormat from "./app/screens/ShootScreenFormat";
import LoginScreen from "./app/screens/LoginScreen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "@firebase/firestore";

// create stack
const Stack = createMaterialTopTabNavigator();

// fonts to load in
const getFonts = () =>
  Font.loadAsync({
    "Roboto-regular": require("./app/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-bold": require("./app/assets/fonts/Roboto-Bold.ttf"),
    "Yellow-tail": require("./app/assets/fonts/Yellowtail-Regular.ttf"),
    "Nunito-reg": require("./app/assets/fonts/Nunito-Regular.ttf"),
  });

// full app stack
function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName={"noonan"}
      backBehavior={"order"}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#0D1F2D" },
      }}
    >
      <Stack.Screen name="Bag" component={BagScreenFormat} options={[]} />
      <Stack.Screen name="noonan" component={WelcomeScreen} options={[]} />
      <Stack.Screen name="Shoot" component={ShootScreenFormat} options={[]} />
    </Stack.Navigator>
  );
}

{
  /* <APP BEGINS HERE ****************************************************************> */
}
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const firebaseConfig = {
    // apiKey: API_KEY,
    // authDomain: AUTH_DOMAIN,
    // projectId: PROJECT_ID,
    // databaseURL: DATABASE_URL,
    // storageBucket: STORAGE_BUCKET,
    // messagingSenderId: MESSAGING_SENDER_ID,
    // appId: APP_ID,
    // measurementId: MEASUREMENT_ID,
  };

  // check if initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // get the database
    getFirestore();
  } else {
    firebase.app();
  }

  // Listen for authentication state to change.
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  const LoadFonts = async () => {
    await getFonts();
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => {
          console.log(err);
        }}
      />
    );
  }

  // auth check navigation
  if (isLoggedIn && fontLoaded) {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: "#0D1F2D" },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
