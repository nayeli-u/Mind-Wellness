import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const GoalListScreen = () => {
  const navigation = useNavigation();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const savedGoals = await AsyncStorage.getItem("goals");
      if (savedGoals !== null) {
        setGoals(JSON.parse(savedGoals));
      }
    } catch (error) {
      console.error("Error loading goals:", error);
    }
  };

  const toggleGoalCompletion = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const saveGoals = async (updatedGoals) => {
    try {
      await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
    } catch (error) {
      console.error("Error saving goals:", error);
      Alert.alert("Error", "Failed to save goals.");
    }
  };

  const renderGoalItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.goalItem}
        onPress={() => toggleGoalCompletion(index)}
      >
        <Text
          style={[styles.goalText, item.completed && styles.completedGoalText]}
        >
          {item.goal}
        </Text>
        <Text
          style={[
            styles.reminderText,
            item.completed && styles.completedReminderText,
          ]}
        >
          {item.reminder}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Goals</Text>
      {goals.length > 0 ? (
        <FlatList
          data={goals}
          renderItem={renderGoalItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No goals set yet.</Text>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("GoalSettingScreen")}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#b783e6",
  },
  goalItem: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  reminderText: {
    fontSize: 14,
    color: "#666666",
  },
  completedGoalText: {
    textDecorationLine: "line-through",
  },
  completedReminderText: {
    textDecorationLine: "line-through",
    color: "#999999",
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
});

export default GoalListScreen;
