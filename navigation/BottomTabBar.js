import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../app/HomeScreen";
import AccountSettingsScreen from "../app/AccountSettingsScreen";
import MoodHistoryScreen from "../app/MoodHistoryScreen"; // Import MoodHistoryScreen
import GoalListScreen from "../app/GoalListScreen"; // Import GoalListScreen
import COLORS from "../constants/theme";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.purple,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGray,
          paddingBottom: 5,
          paddingTop: 5,
          display: "flex",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AccountSetting") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "MoodHistory") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "GoalList") {
            iconName = focused ? "list" : "list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MoodHistory"
        component={MoodHistoryScreen}
        options={{
          tabBarLabel: "Mood History",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="GoalList"
        component={GoalListScreen}
        options={{
          tabBarLabel: "Goals",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AccountSetting"
        component={AccountSettingsScreen}
        options={{
          tabBarLabel: "Settings",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
