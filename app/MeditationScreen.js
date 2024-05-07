import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MeditationScreen = () => {
  const navigation = useNavigation();

  const handleStartMeditation = (duration, soundFile, backgroundImage) => {
    navigation.navigate("MeditationPlayer", {
      duration: duration,
      soundFile: soundFile,
      backgroundImage: backgroundImage,
    });
  };

  const meditationSessions = [
    {
      duration: 5,
      soundFile: require("../assets/heavy-rain-nature-sounds-8186.mp3"),
      label: "Meditation Session 1",
      backgroundImage: require("../assets/balance-3356547_1280.jpg"),
    },
    {
      duration: 10,
      soundFile: require("../assets/birds-singing-calm-river-nature-ambient-sound-127411.mp3"),
      label: "Meditation Session 2",
      backgroundImage: require("../assets/pngtree-lakescape-landscape-nature-scenery-hd-image_2950137.jpg"),
    },
    {
      duration: 15,
      soundFile: require("../assets/moments-of-forgetfulness-186426.mp3"),
      label: "Meditation Session 3",
      backgroundImage: require("../assets/digital-painting-castle-lake-with-sunset-background_467123-21172.jpg.avif"),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Meditation Session</Text>
      {meditationSessions.map((session) => (
        <TouchableOpacity
          key={session.duration}
          style={styles.button}
          onPress={() =>
            handleStartMeditation(
              session.duration,
              session.soundFile,
              session.backgroundImage
            )
          }
        >
          <ImageBackground
            source={session.backgroundImage}
            style={styles.imageBackground}
            imageStyle={styles.image}
          >
            <Text style={styles.buttonText}>{session.label}</Text>
            <Text style={styles.durationText}>{session.duration} Minutes</Text>
          </ImageBackground>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#b783e6",
  },
  button: {
    width: "100%",
    aspectRatio: 16 / 9, // Aspect ratio for the button (adjust as needed)
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  durationText: {
    color: "#ffffff",
    fontSize: 14,
    marginTop: 5,
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

export default MeditationScreen;
