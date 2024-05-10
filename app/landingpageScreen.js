import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const LandingPageScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mind Wellness</Text>
      <Image
        source={require("/Users/nayeli/ReactNativeProject/MindWellness/assets/brain.png")}
        style={styles.brain}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Begin Your Journey</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b783e6",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 65,
    fontWeight: "bold",
    color: "#ffffff",
    marginVertical: 30,
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  brain: {
    width: 418,
    height: 288,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#340B67",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default LandingPageScreen;
