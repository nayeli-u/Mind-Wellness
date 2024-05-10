import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

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
      duration: 300, // 5 minutes in seconds
      soundFile: require("../assets/relaxing-mountains-rivers-streams-running-water-18178.mp3"),
      label: "Meditation Session 1",
      backgroundImage: require("../assets/balance-3356547_1280.jpg"),
    },
    {
      duration: 600, // 10 minutes in seconds
      soundFile: require("../assets/meditation-and-gentle-nature-184572.mp3"),
      label: "Meditation Session 2",
      backgroundImage: require("../assets/pngtree-lakescape-landscape-nature-scenery-hd-image_2950137.jpg"),
    },
    {
      duration: 900, // 15 minutes in seconds
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
            <Text style={styles.durationText}>
              {session.duration / 60} Minutes
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      ))}
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
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    //marginBottom: 10,
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
    //lexDirection: "row",
    //alignItems: "center",
    position: "absolute",
    top: 20,
    left: 20,
    paddingTop: 10,
  },
});

export default MeditationScreen;
