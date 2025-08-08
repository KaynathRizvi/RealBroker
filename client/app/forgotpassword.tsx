import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Pressable,
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import styles from "./styles/forgotpasswordStyles";
import { LinearGradient } from "expo-linear-gradient";

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    // ❗️Check if email is empty
    if (!email.trim()) {
      setErrorMessage("Email field cannot be empty.");
      setSuccessMessage("");
      return;
    }

    try {
      const res = await fetch(`${SERVER_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Something went wrong");
        setSuccessMessage("");
      } else {
        setErrorMessage("");
        setSuccessMessage(data.message || "Check your email for reset link");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <LinearGradient colors={["#e0f2fe", "#fdf2f8"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.formBox}
      >
        <Text style={styles.title}>Reset Your Password 🔒</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Your Email"
          placeholderTextColor="#6d628cff"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        {errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

        <Pressable style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Send Reset Email</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Go Back to Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
