import { StatusBar } from "expo-status-bar";
import React from "react";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import BagScreen from "./app/screens/BagScreen";
import ShootScreen from "./app/screens/ShootScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native"; //components

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="noonan" component={WelcomeScreen} />
      <Stack.Screen name="Bag" component={BagScreen} />
      <Stack.Screen name="Shoot" component={ShootScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
