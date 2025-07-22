"use client"

import { Stack, useRouter } from "expo-router"
import { useState } from "react"
import { Pressable, Text, TextInput, View, Alert, ActivityIndicator } from "react-native"
import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import styles from "../styles/loginStyles"

const SERVER_URL = Constants.expoConfig?.extra?.DEBUG_SERVER_URL || Constants.expoConfig?.extra?.SERVER_URL

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token and user info
        await AsyncStorage.setItem("token", data.token)
        await AsyncStorage.setItem("userEmail", email)

        setErrorMessage("")

        // Check subscription status from login response
        if (data.hasActiveSubscription) {
          Alert.alert("Success", "Logged in successfully!")
          router.replace("/home")
        } else {
          Alert.alert("Subscription Required", "Please purchase a subscription to continue.")
          router.replace("/subscription")
        }
      } else {
        console.log("Login error:", data.message)
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
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Login" }} />
      <Text style={styles.title}>Login Page</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        editable={!loading}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        editable={!loading}
      />

      {errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
          <Pressable style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
            <Pressable style={styles.button} onPress={() => router.push('/register')}>
              <Text style={styles.buttonText}>Go to Register</Text>
            </Pressable>

            <Pressable style={styles.forgotButton} onPress={() => router.push('/forgotpassword')}>
              <Text style={styles.forgotButtonText}>Forgot Password?</Text>
            </Pressable>
          </>
        )}
    </View>
  )
}
