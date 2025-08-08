"use client"

import { useRouter } from "expo-router"
import { useState, useEffect } from "react"
import {
  Pressable,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
} from "react-native"
import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import styles from "../styles/loginStyles"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    loadRememberedCredentials()
  }, [])

  const loadRememberedCredentials = async () => {
    const savedEmail = await AsyncStorage.getItem("rememberedEmail")
    const savedPassword = await AsyncStorage.getItem("rememberedPassword")
    if (savedEmail && savedPassword) {
      setEmail(savedEmail)
      setPassword(savedPassword)
      setRememberMe(true)
    }
  }

  const login = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password")
      return
    }

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address")
      return
    }

    setLoading(true)

    try {
      await AsyncStorage.removeItem("token")

      const response = await fetch(`${SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem("token", data.token)
        await AsyncStorage.setItem("userEmail", email)

        if (rememberMe) {
          await AsyncStorage.setItem("rememberedEmail", email)
          await AsyncStorage.setItem("rememberedPassword", password)
        } else {
          await AsyncStorage.removeItem("rememberedEmail")
          await AsyncStorage.removeItem("rememberedPassword")
        }

        setErrorMessage("")

        if (data.hasActiveSubscription) {
          Alert.alert("Success", "Logged in successfully!")
          router.replace("/home")
        } else {
          Alert.alert("Subscription Required", "Please purchase a subscription to continue.")
          router.replace("/subscription")
        }
      } else {
        setErrorMessage(data.message || "Login failed")
        setPassword("")
      }
    } catch (error) {
      Alert.alert("Network error", (error as Error).message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LinearGradient colors={["#e0f2fe", "#fdf2f8"]} style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Welcome Back 👋</Text>

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#6d628cff"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          editable={!loading}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#6d628cff"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { flex: 1 }]}
            editable={!loading}
          />
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

        <View style={styles.checkboxContainer}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: "#d1d5db", true: "#8dd7d8ff" }}
            thumbColor={rememberMe ? "#fff" : "#f4f3f4"}
          />
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View>

        {errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : (
          <>
            <Pressable style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => router.push("/register")}>
              <Text style={styles.buttonText}>Go to Register</Text>
            </Pressable>

            <Pressable style={styles.forgotButton} onPress={() => router.push("/forgotpassword")}>
              <Text style={styles.forgotButtonText}>Forgot Password?</Text>
            </Pressable>
          </>
        )}
      </View>
    </LinearGradient>
  )
}
