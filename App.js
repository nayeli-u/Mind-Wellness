import React, { useState, useEffect } from "react";
import LoginScreen from "./app/LoginScreen";
import LandingPageScreen from "./app/LandingPageScreen";
import SignUpScreen from "./app/SignUpScreen";
//import HomeScreen from "./app/HomeScreen";
import MoodTrackingScreen from "./app/MoodTrackingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MoodHistoryScreen from "./app/MoodHistoryScreen";
//import AccountSettingsScreen from "./app/AccountSettingsScreen";
import GoalSettingScreen from "./app/GoalSettingScreen";
import GoalListScreen from "./app/GoalListScreen";
import Affirmations from "./app/Affirmations";
import MeditationScreen from "./app/MeditationScreen";

//import { LoginScreen, SignUpScreen, landingpageScreen } from "./app";
import { app } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { useAuth, AuthProvider } from "./navigation/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabBar from "./navigation/BottomTabBar";
import MeditationPlayer from "./app/MeditationPlayer";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    // Check if user is already logged in
    const checkUserLoggedIn = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching user from AsyncStorage:", error);
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <AuthProvider user={user}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="HomeScreenSignedIn"
              component={BottomTabBar}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="LandingPageScreen"
              component={LandingPageScreen}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="LandingPageScreenLoggedOut"
            component={LandingPageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={BottomTabBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Mood"
            component={MoodTrackingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MoodHistory"
            component={MoodHistoryScreen}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="AccountSetting"
            component={BottomTabBar}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="GoalSetting"
            component={GoalSettingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GoalList"
            component={GoalListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Affirmation"
            component={Affirmations}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Meditation"
            component={MeditationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MeditationPlayer"
            component={MeditationPlayer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
