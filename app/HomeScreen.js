import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleResourceLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open link:", err)
    );
  };

  const mentalHealthResources = [
    {
      title: "National Suicide Prevention Lifeline",
      url: "https://suicidepreventionlifeline.org/",
    },
    {
      title: "National Alliance on Mental Illness",
      url: "https://www.nami.org/",
    },
    {
      title: "Crisis Text Line",
      url: "https://www.crisistextline.org/",
    },
    {
      title: "MentalHealth.gov",
      url: "https://www.mentalhealth.gov/",
    },
    {
      title: "Anxiety and Depression Association of America",
      url: "https://adaa.org/",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Welcome to Your Mental Health Companion
        </Text>
        <Text style={styles.subtitle}>
          What kind of support do you need today?
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Meditation")}
          >
            <Text style={styles.buttonText}>Start Meditation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Mood")}
          >
            <Text style={styles.buttonText}>Track Your Mood</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("GoalSetting")}
          >
            <Text style={styles.buttonText}>Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Affirmation")}
          >
            <Text style={styles.buttonText}>Daily Affirmations</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.resourcesContainer}>
        <Text style={styles.resourcesTitle}>
          Helpful Mental Health Resources
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.resourceButtonsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {mentalHealthResources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resourceButton}
              onPress={() => handleResourceLink(resource.url)}
            >
              <Text style={styles.resourceButtonText}>{resource.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  content: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
    paddingVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    color: "#666",
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#b783e6",
    height: 80,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  resourcesContainer: {
    paddingBottom: 30,
    //alignItems: "center",
  },
  resourcesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    //textAlign: "center",
  },
  resourceButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resourceButton: {
    backgroundColor: "#b783e6",
    width: 140,
    height: 140,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  resourceButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
