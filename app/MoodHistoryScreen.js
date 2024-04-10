import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const MoodHistoryScreen = () => {
  const navigation = useNavigation();
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = async () => {
    try {
      const savedMoodHistory = await AsyncStorage.getItem("moodHistory");
      if (savedMoodHistory !== null) {
        const parsedMoodHistory = JSON.parse(savedMoodHistory).map((entry) => ({
          mood: entry.mood,
          date: entry.date ? new Date(entry.date) : null, // Parse date string into Date object or set to null
        }));
        setMoodHistory(parsedMoodHistory);
      }
    } catch (error) {
      console.error("Error loading mood history:", error);
    }
  };

  const renderMoodItem = ({ item }) => {
    const { mood, date } = item;
    return (
      <View style={styles.moodItem}>
        <Text style={styles.moodText}>{mood}</Text>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </View>
    );
  };

  const formatDate = (date) => {
    if (!date || isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString(); // Format date using toLocaleDateString
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood History</Text>
      {moodHistory.length > 0 ? (
        <FlatList
          data={moodHistory}
          renderItem={renderMoodItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.moodList}
        />
      ) : (
        <Text>No mood history available</Text>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  moodList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  moodItem: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  moodText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: "#666666",
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

export default MoodHistoryScreen;
