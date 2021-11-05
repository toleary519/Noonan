import React from "react";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import BagScreenFormat from "./app/screens/BagScreenFormat";
import ShootScreenFormat from "./app/screens/ShootScreenFormat";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native"; //components

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="noonan" component={WelcomeScreen} />
      <Stack.Screen
        name="Bag"
        component={BagScreenFormat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Shoot"
        component={ShootScreenFormat}
        options={{ headerShown: false }}
      />
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
