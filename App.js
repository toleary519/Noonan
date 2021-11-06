import React from "react";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import BagScreenFormat from "./app/screens/BagScreenFormat";
import ShootScreenFormat from "./app/screens/ShootScreenFormat";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native"; //components

const Stack = createMaterialTopTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={"noonan"} backBehavior={"order"}>
      <Stack.Screen
        name="Bag"
        component={BagScreenFormat}
        options={[{ headerShown: false, tabBarShowLabel: false }]}
      />
      <Stack.Screen
        name="noonan"
        component={WelcomeScreen}
        options={[{ headerShown: false, tabBarShowLabel: false }]}
      />
      <Stack.Screen
        name="Shoot"
        component={ShootScreenFormat}
        options={[{ headerShown: false, tabBarShowLabel: false }]}
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
