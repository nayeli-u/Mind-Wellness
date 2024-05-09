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
        setMoodHistory(JSON.parse(savedMoodHistory));
      }
    } catch (error) {
      console.error("Error loading mood history:", error);
    }
  };

  const updateMoodHistory = async (period, mood) => {
    const updatedHistory = [...moodHistory];
    const existingEntryIndex = updatedHistory.findIndex(
      (entry) => entry.period === period
    );
    if (existingEntryIndex !== -1) {
      // Update existing entry
      updatedHistory[existingEntryIndex] = {
        period,
        mood,
        datetime: new Date(),
      };
    } else {
      // Add new entry
      updatedHistory.push({ period, mood, datetime: new Date() });
    }

    // Save updated mood history to AsyncStorage
    try {
      await AsyncStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
      setMoodHistory(updatedHistory);
      updateMoodHistory(updatedHistory);
    } catch (error) {
      console.error("Error saving mood history:", error);
    }
  };

  const renderMoodItem = ({ item }) => {
    return (
      <View style={styles.moodItem}>
        {/* Display Period Icon, Date, and Time */}
        <View style={styles.detailsContainer}>
          <Text>{getPeriodIcon(item.period)}</Text>
          <Text>{new Date(item.datetime).toLocaleString()}</Text>
        </View>
        <Text style={styles.moodText}>{item.mood}</Text>
      </View>
    );
  };

  const getPeriodIcon = (period) => {
    switch (period) {
      case "Morning":
        return "🌅"; // Sunrise
      case "Afternoon":
        return "☀️"; // Sun
      case "Night":
        return "🌙"; // Moon
      default:
        return "";
    }
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#b783e6",
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
    flex: 1,
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#b783e6",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10, // Add margin bottom to separate from mood
  },
});

export default MoodHistoryScreen;
