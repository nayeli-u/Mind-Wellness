import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const Affirmations = () => {
  const navigation = useNavigation();
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    getDailyAffirmation();
  }, []);

  const getDailyAffirmation = async () => {
    try {
      const currentDate = new Date().toDateString();
      const storedDate = await AsyncStorage.getItem("affirmationDate");
      const storedAffirmation = await AsyncStorage.getItem("dailyAffirmation");

      if (storedDate !== currentDate || !storedAffirmation) {
        // Fetch new affirmation if it's a new day or no stored affirmation exists
        const newAffirmation = fetchNewAffirmation();
        setAffirmation(newAffirmation);
        await AsyncStorage.setItem("dailyAffirmation", newAffirmation);
        await AsyncStorage.setItem("affirmationDate", currentDate);
      } else {
        // Use the stored affirmation if it's the same day
        setAffirmation(storedAffirmation);
      }
    } catch (error) {
      console.error("Error getting daily affirmation:", error);
    }
  };

  const fetchNewAffirmation = () => {
    // Predefined list of affirmations
    const affirmations = [
      "I am capable of achieving my goals.",
      "I am worthy of love and respect.",
      "I attract positivity into my life.",
      "I am strong, confident, and resilient.",
      "I believe in myself and my abilities.",
      "Every day I am getting stronger.",
      "I am fearless in the pursuit of what sets my soul on fire.",
      "I am in charge of how I feel, and today I am choosing happiness.",
      "My life is a reflection of the energy I put out into the world.",
      "I am open to new adventures and opportunities.",
      "I radiate confidence, self-respect, and inner harmony.",
      "I am worthy of all the good things life has to offer.",
      "I let go of all that no longer serves me and make space for positivity.",
      "My potential is limitless.",
      "I am grateful for all that I have and all that is yet to come.",
      "I am worthy of success and abundance.",
      "I attract abundance and prosperity with every thought I think.",
      "I am surrounded by love and abundance.",
      "I trust that everything happens for my highest good.",
      "I am free to create the life I desire.",
      "I choose to see the good in every situation.",
      "I am resilient, strong, and capable of overcoming any challenge.",
      "I release all doubts and fears and embrace confidence and courage.",
      "I am deserving of love, happiness, and fulfillment.",
      "My mind is filled with positive and empowering thoughts.",
      "I am a magnet for miracles and blessings.",
      "I am at peace with where I am and excited for where I am going.",
      "I am worthy of all the amazing things life has to offer.",
      "I am the architect of my destiny; I build its foundation and choose its contents.",
      "I am creating a life filled with love, joy, and abundance.",
      "I attract positive people and circumstances into my life.",
      "I am a magnet for success and prosperity.",
      "I am confident in my ability to achieve my goals.",
      "I trust in the process of life and let go of all resistance.",
      "I am surrounded by love, peace, and abundance.",
      "I am deserving of all the good things life has to offer.",
      "I am guided by divine wisdom and intuition.",
      "I am aligned with the energy of abundance and prosperity.",
      "I am worthy of success, love, and happiness.",
      "I am open to receiving all the blessings the universe has to offer.",
      "I am grateful for the abundance that flows into my life.",
      "I am the master of my own destiny.",
      "I attract opportunities and success effortlessly.",
      "I radiate positivity, love, and joy.",
      "I am capable of achieving anything I set my mind to.",
      "I am surrounded by abundance and prosperity.",
      "I am worthy of all the blessings in the world.",
      "I am deserving of love, happiness, and fulfillment.",
    ];

    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Affirmation of the Day</Text>
      <View style={styles.affirmationContainer}>
        <Text style={styles.affirmationText}>{affirmation}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.backButton}
      >
        <AntDesign name="leftcircle" size={30} color="#b783e6" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C3B1E1",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  affirmationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignSelf: "stretch",
  },
  affirmationText: {
    fontSize: 24,
    textAlign: "center",
    color: "#333",
    fontStyle: "italic",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingTop: 20,
  },
});

export default Affirmations;
