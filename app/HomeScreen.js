import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What kind of support do you need today?</Text>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Meditation")}
        >
          <Text style={styles.buttonText}>Start Meditation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MoodTrackingScreen")}
        >
          <Text style={styles.buttonText}>Track Your Mood</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("GoalSettingScreen")}
        >
          <Text style={styles.buttonText}>Set Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Affirmations")}
        >
          <Text style={styles.buttonText}>Daily Affirmations</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate("landingpageScreen")}
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
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
    color: "#b783e6",
    paddingVertical: 40,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  button: {
    backgroundColor: "#b783e6",
    width: 300, // Set the width of all buttons
    height: 100, // Set the height of all buttons
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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

export default HomeScreen;
