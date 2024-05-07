/* import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const MoodTrackingScreen = () => {
  const navigation = useNavigation();
  const [moodHistory, setMoodHistory] = useState([]);

  const moodOptions = ["😄", "😊", "😐", "😔", "😢"];

  useEffect(() => {
    checkAndSetMood();
  }, []);

  const checkAndSetMood = async () => {
    const savedMoodHistory = await AsyncStorage.getItem("moodHistory");
    if (savedMoodHistory !== null) {
      setMoodHistory(JSON.parse(savedMoodHistory));
    } else {
      setMoodHistory([]);
    }
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      const morningMoodExists = moodHistory.some(
        (mood) => mood.period === "Morning"
      );
      if (!morningMoodExists) {
        const defaultMood = "No mood was selected this morning.";
        handleMoodSelection(defaultMood);
      }
    } else if (currentHour < 18) {
      const afternoonMoodExists = moodHistory.some(
        (mood) => mood.period === "Afternoon"
      );
      if (!afternoonMoodExists) {
        const defaultMood = "No mood was selected this afternoon.";
        handleMoodSelection(defaultMood);
      }
    } else {
      const nightMoodExists = moodHistory.some(
        (mood) => mood.period === "Night"
      );
      if (!nightMoodExists) {
        const defaultMood = "No mood was selected this night.";
        handleMoodSelection(defaultMood);
      }
    }
  };

  const handleMoodSelection = async (mood) => {
    const period = getPeriodOfDay();
    const newMoodEntry = { mood, datetime: new Date().toISOString(), period }; // Add period to mood entry
    const newMoodHistory = [...moodHistory, newMoodEntry];
    setMoodHistory(newMoodHistory);
    await AsyncStorage.setItem("moodHistory", JSON.stringify(newMoodHistory));
  };

  const getPeriodOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Morning";
    } else if (currentHour < 18) {
      return "Afternoon";
    } else {
      return "Night";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <View style={styles.moodOptionsContainer}>
        {moodOptions.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={styles.moodOption}
            onPress={() => handleMoodSelection(mood)}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("MoodHistory", { moodHistory })}
        style={styles.viewHistoryButton}
      >
        <Text style={styles.viewHistoryText}>View Mood History</Text>
      </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  moodOptionsContainer: {
    flexDirection: "row",
  },
  moodOption: {
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "#b783e6",
  },
  moodText: {
    fontSize: 20,
  },
  viewHistoryButton: {
    marginTop: 20,
    backgroundColor: "#b783e6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  viewHistoryText: {
    color: "#ffffff",
    fontSize: 18,
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

export default MoodTrackingScreen;
 */

import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const MoodTrackingScreen = () => {
  const navigation = useNavigation();
  const [moodHistory, setMoodHistory] = useState([]);

  const moodOptions = ["😄", "😊", "😐", "😔", "😢"];

  useEffect(() => {
    checkAndSetMood();
  }, []);

  const checkAndSetMood = async () => {
    const savedMoodHistory = await AsyncStorage.getItem("moodHistory");
    if (savedMoodHistory !== null) {
      setMoodHistory(JSON.parse(savedMoodHistory));
    } else {
      setMoodHistory([]);
    }
  };

  const handleMoodSelection = async (mood) => {
    const period = getPeriodOfDay();
    const newMoodEntry = { mood, datetime: new Date().toISOString(), period }; // Add period to mood entry
    const updatedMoodHistory = [...moodHistory];
    const existingEntryIndex = updatedMoodHistory.findIndex(
      (entry) => entry.period === period
    );
    if (existingEntryIndex !== -1) {
      // Update existing mood entry
      updatedMoodHistory[existingEntryIndex] = newMoodEntry;
    } else {
      // Add new mood entry
      updatedMoodHistory.push(newMoodEntry);
    }
    setMoodHistory(updatedMoodHistory);
    await AsyncStorage.setItem(
      "moodHistory",
      JSON.stringify(updatedMoodHistory)
    );
  };

  const getPeriodOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Morning";
    } else if (currentHour < 18) {
      return "Afternoon";
    } else {
      return "Night";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <View style={styles.moodOptionsContainer}>
        {moodOptions.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={styles.moodOption}
            onPress={() => handleMoodSelection(mood)}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("MoodHistory")}
        style={styles.viewHistoryButton}
      >
        <Text style={styles.viewHistoryText}>View Mood History</Text>
      </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  moodOptionsContainer: {
    flexDirection: "row",
  },
  moodOption: {
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "#b783e6",
  },
  moodText: {
    fontSize: 20,
  },
  viewHistoryButton: {
    marginTop: 20,
    backgroundColor: "#b783e6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  viewHistoryText: {
    color: "#ffffff",
    fontSize: 18,
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
});

export default MoodTrackingScreen;
