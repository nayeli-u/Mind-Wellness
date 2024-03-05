import React from "react";
import LoginScreen from "./app/LoginScreen";
import landingpageScreen from "./app/landingpageScreen";
import SignUpScreen from "./app/SignUpScreen";
import HomeScreen from "./app/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { LoginScreen, SignUpScreen, landingpageScreen } from "./app";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="landingpageScreen" component={landingpageScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
