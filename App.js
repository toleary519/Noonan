import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import BagScreenFormat from "./app/screens/BagScreenFormat";
import ShootScreenFormat from "./app/screens/ShootScreenFormat";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Stack = createMaterialTopTabNavigator();

const getFonts = () =>
  Font.loadAsync({
    "Roboto-regular": require("./app/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-bold": require("./app/assets/fonts/Roboto-Bold.ttf"),
  });

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName={"noonan"}
      backBehavior={"order"}
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Stack.Screen name="Bag" component={BagScreenFormat} options={[]} />
      <Stack.Screen name="noonan" component={WelcomeScreen} options={[]} />
      <Stack.Screen name="Shoot" component={ShootScreenFormat} options={[]} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (fontLoaded) {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.warn(error)}
      />
    );
  }
}
