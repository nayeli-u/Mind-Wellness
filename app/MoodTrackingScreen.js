import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const MoodTrackingScreen = () => {
  const navigation = useNavigation();
  const [moodHistory, setMoodHistory] = useState([]);

  const moodOptions = ["😄", "😊", "😐", "😔", "😢"];

  const handleMoodSelection = async (mood) => {
    const newMoodEntry = { mood, date: new Date().toISOString() }; // Convert date to string
    const newMoodHistory = [...moodHistory, newMoodEntry];
    setMoodHistory(newMoodHistory);
    await AsyncStorage.setItem("moodHistory", JSON.stringify(newMoodHistory));
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
        onPress={() =>
          navigation.navigate("MoodHistoryScreen", { moodHistory })
        }
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
