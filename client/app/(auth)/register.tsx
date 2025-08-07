"use client";

import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Alert,
  Switch,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/registerStyles";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadRememberedCredentials();
  }, []);

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

  const register = async () => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        Alert.alert("Success", "Registered successfully!");

        if (rememberMe) {
          await AsyncStorage.setItem("rememberedEmail", email);
          await AsyncStorage.setItem("rememberedPassword", password);
        } else {
          await AsyncStorage.removeItem("rememberedEmail");
          await AsyncStorage.removeItem("rememberedPassword");
        }

        router.replace("/login");
      } else {
        setErrorMessage(data.message || "Something went wrong");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      Alert.alert("Network error", (error as Error).message || "Unknown error");
    }
  };

  return (
  <LinearGradient colors={["#e0f2fe", "#fdf2f8"]} style={styles.container}>
    <View style={styles.formBox}>
      <Text style={styles.title}>Register Page</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#7dd3fc"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#7dd3fc"
          />
        </TouchableOpacity>
      </View>

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

      {errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}

      <Pressable style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </Pressable>
    </View>
  </LinearGradient>
  );
}
