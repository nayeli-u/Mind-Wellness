import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const GoalSettingScreen = () => {
  const navigation = useNavigation();
  const [goal, setGoal] = useState("");
  const [reminder, setReminder] = useState("");

  useEffect(() => {
    loadGoalAndReminder();
  }, []);

  const loadGoalAndReminder = async () => {
    try {
      const savedGoal = await AsyncStorage.getItem("goal");
      const savedReminder = await AsyncStorage.getItem("reminder");
      if (savedGoal !== null) {
        setGoal(savedGoal);
      }
      if (savedReminder !== null) {
        setReminder(savedReminder);
      }
    } catch (error) {
      console.error("Error loading goal and reminder:", error);
    }
  };

  const saveGoalAndReminder = async () => {
    try {
      const savedGoals = await AsyncStorage.getItem("goals");
      let goals = [];
      if (savedGoals !== null) {
        goals = JSON.parse(savedGoals);
      }
      goals.push({ goal, reminder });
      await AsyncStorage.setItem("goals", JSON.stringify(goals));
      Alert.alert("Success", "Goal and reminder saved successfully.");
    } catch (error) {
      console.error("Error saving goal and reminder:", error);
      Alert.alert("Error", "Failed to save goal and reminder.");
    }
  };

  const deleteGoalAndReminder = async () => {
    try {
      await AsyncStorage.removeItem("goal");
      await AsyncStorage.removeItem("reminder");
      setGoal("");
      setReminder("");
      Alert.alert("Success", "Goal and reminder deleted successfully.");
    } catch (error) {
      console.error("Error deleting goal and reminder:", error);
      Alert.alert("Error", "Failed to delete goal and reminder.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your goal"
        value={goal}
        onChangeText={setGoal}
      />
      <TextInput
        style={styles.input}
        placeholder="Set a reminder"
        value={reminder}
        onChangeText={setReminder}
      />
      <TouchableOpacity style={styles.button} onPress={saveGoalAndReminder}>
        <Text style={styles.buttonText}>Save Goal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={deleteGoalAndReminder}
      >
        <Text style={styles.deleteButtonText}>Delete Goal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("GoalListScreen")}
        style={styles.viewGoalsButton}
      >
        <Text style={styles.viewGoalsButtonText}>View Goals</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#b783e6",
    paddingVertical: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#b783e6",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#b783e6",
  },
  viewGoalsButton: {
    backgroundColor: "#b783e6",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: "auto", // Pushes the button to the bottom
  },
  viewGoalsButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GoalSettingScreen;
