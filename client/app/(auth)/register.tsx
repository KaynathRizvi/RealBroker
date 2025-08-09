import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Pressable, Text, TextInput, View, Alert, Switch, TouchableOpacity } from "react-native";
import styles from "../styles/registerStyles";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Get API server URL from Expo config (supports debug + production URLs)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load remembered email/password on mount
  useEffect(() => {
    loadRememberedCredentials();
  }, []);

  // Load saved credentials from AsyncStorage
  const loadRememberedCredentials = async () => {
    const savedEmail = await AsyncStorage.getItem("rememberedEmail");
    const savedPassword = await AsyncStorage.getItem("rememberedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setConfirmPassword(savedPassword);
      setRememberMe(true);
    }
  };

  // Handle registration
  const register = async () => {
    // Validate fields
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required");
      return;
    }

    // Email format check
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // At least one special character in password
    const specialCharRegex = /[^A-Za-z0-9]/;
    if (!specialCharRegex.test(password)) {
      setErrorMessage("Password must contain at least one special character");
      return;
    }

    try {
      // Send registration request to server
      const response = await fetch(`${SERVER_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        Alert.alert("Success", "Registered successfully!");

        // Save or clear credentials based on rememberMe
        if (rememberMe) {
          await AsyncStorage.setItem("rememberedEmail", email);
          await AsyncStorage.setItem("rememberedPassword", password);
        } else {
          await AsyncStorage.removeItem("rememberedEmail");
          await AsyncStorage.removeItem("rememberedPassword");
        }

        // Redirect to login page
        router.replace("/login");
      } else {
        // Show server error message
        setErrorMessage(data.message || "Something went wrong");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      // Handle network errors
      Alert.alert("Network error", (error as Error).message || "Unknown error");
    }
  };

  return (
    // Background gradient
    <LinearGradient colors={["#e0f2fe", "#fdf2f8"]} style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Register Page</Text>

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#6d628cff"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#6d628cff"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { flex: 1 }]}
          />
          {/* Show/Hide password button */}
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#8e7ebaff"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#6d628cff"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={[styles.input, { flex: 1 }]}
          />
          {/* Show/Hide password button */}
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#8e7ebaff"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me Switch */}
        <View style={styles.checkboxContainer}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: "#d1d5db", true: "#8dd7d8ff" }}
            thumbColor={rememberMe ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#d1d5db"
          />
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View>

        {/* Error Message */}
        {errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}

        {/* Register Button */}
        <Pressable style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>

        {/* Go to Login Button */}
        <Pressable style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}