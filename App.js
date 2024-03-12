import React from "react";
import LoginScreen from "./app/LoginScreen";
import landingpageScreen from "./app/landingpageScreen";
import SignUpScreen from "./app/SignUpScreen";
import HomeScreen from "./app/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { LoginScreen, SignUpScreen, landingpageScreen } from "./app";
//import { app } from "./firebaseConfig";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="landingpage" component={landingpageScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
