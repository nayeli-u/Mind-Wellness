// GoalListScreen.js
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
import { FontAwesome } from "@expo/vector-icons";

const GoalListScreen = () => {
  const navigation = useNavigation();
  const [goals, setGoals] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);

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

  const toggleGoalSelection = (goalId) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const toggleGoalCompletion = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const deleteSelectedGoals = async () => {
    try {
      const updatedGoals = goals.filter(
        (goal, index) => !selectedGoals.includes(index)
      );
      setGoals(updatedGoals);
      setSelectedGoals([]);
      await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
    } catch (error) {
      console.error("Error deleting goals:", error);
      Alert.alert("Error", "Failed to delete selected goals.");
    }
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
    const isSelected = selectedGoals.includes(index);
    return (
      <TouchableOpacity
        style={[styles.goalItem, isSelected && styles.selectedGoalItem]}
        onPress={() => toggleGoalSelection(index)}
      >
        <Text style={styles.goalText}>{item.goal}</Text>
        <Text style={styles.reminderText}>{item.reminder}</Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => toggleGoalCompletion(index)}
        >
          {item.completed ? (
            <FontAwesome name="check-square" size={24} color="green" />
          ) : (
            <FontAwesome name="square-o" size={24} color="black" />
          )}
        </TouchableOpacity>
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
      {selectedGoals.length > 0 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteSelectedGoals}
        >
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("GoalSetting")}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add Goal</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedGoalItem: {
    backgroundColor: "#808080",
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    marginBottom: 5,
  },
  reminderText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  iconContainer: {
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#b783e6",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    marginTop: "auto",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GoalListScreen;
