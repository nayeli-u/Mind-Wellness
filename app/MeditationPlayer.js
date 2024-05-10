import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";

const MeditationPlayer = ({ route }) => {
  const navigation = useNavigation();
  const { duration, soundFile, backgroundImage } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [durationMillis, setDurationMillis] = useState(duration * 1000); // Convert duration to milliseconds

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(soundFile, {
          shouldPlay: false,
        });
        setSound(sound);
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        //console.log("Sound loaded successfully.");
      } catch (error) {
        console.error("Error loading sound:", error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isPlaying) {
      setIsPlaying(true);
      setPosition(status.positionMillis);
      if (status.positionMillis >= durationMillis) {
        setIsPlaying(false);
        sound.stopAsync();
        setPosition(0);
      }
    } else {
      setIsPlaying(false);
      setPosition(0);
    }
  };

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  const formatTime = (millis) => {
    const totalSeconds = millis / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  /* const handleSliderChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  }; */

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={backgroundImage} style={styles.image} />
      </View>
      <Text style={styles.title}>
        Meditation Session ({duration / 60} Minutes)
      </Text>
      <View style={styles.controls}>
        <Slider
          style={styles.slider}
          //value={position}
          minimumValue={0}
          maximumValue={durationMillis}
          //minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#b783e6"
          disabled={!sound}
          /* onValueChange={handleSliderChange} */
        />
        <View style={styles.timeContainer}>
          <Text>{formatTime(position)}</Text>
          <Text>{formatTime(durationMillis)}</Text>
        </View>
        <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
          <Text style={styles.playButtonText}>
            {isPlaying ? "Pause" : "Play"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
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
  },
  imageContainer: {
    width: "90%",
    aspectRatio: 16 / 9, // Adjust the aspect ratio as needed
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#b783e6",
    position: "absolute",
    paddingTop: 50,
    top: 100,
  },
  controls: {
    alignItems: "center",
    marginTop: 20,
  },
  slider: {
    width: 300,
    height: 40,
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: "#b783e6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  playButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingTop: 20,
  },
});

export default MeditationPlayer;
