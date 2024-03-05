import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/theme";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 12,
            color: COLORS.black,
          }}
        >
          Create Account
        </Text>

        <Text style={{ fontSize: 16, color: COLORS.black }}>
          Start your journey today!
        </Text>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
            Email Address
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{ width: "100%" }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
            Password
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{ width: "100%" }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.black : undefined}
          />

          <Text>I agree to the terms and conditions</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.LogInContainer}>
          <TouchableOpacity>
            <Text style={styles.LogInText}>Already have an account?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.LogInLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#340B67",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  LogInContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  LogInText: {
    color: "#000000",
    fontSize: 12,
  },
  LogInLink: {
    color: "#4285f4",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
