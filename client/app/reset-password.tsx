import { useRouter, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles/resetPasswordStyles'

// 🌍 Determine backend server URL from Expo config
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL

export default function ResetPasswordScreen() {
  const router = useRouter()

  // 🔑 Get token from URL query params (deep link or navigation)
  const params = useLocalSearchParams()
  const token = params.token as string

  // 📝 Form state
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // 📩 Handle password reset request
  const handleReset = async () => {
    // 1️⃣ Validate empty fields
    if (!password || !confirm) {
      setErrorMessage('All fields are required')
      setSuccessMessage('')
      return
    }

    // 2️⃣ Check password match
    if (password !== confirm) {
      setErrorMessage('Passwords do not match')
      setSuccessMessage('')
      return
    }

    try {
      // 3️⃣ Send new password to API with token in URL
      const res = await fetch(`${SERVER_URL}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password }),
      })

      const data = await res.json()

      // 4️⃣ Success → show message & redirect after 2s
      if (res.ok) {
        setErrorMessage('')
        setSuccessMessage('Password reset successfully')
        setTimeout(() => router.push('/login'), 2000)
      } else {
        // ❌ API returned an error
        setSuccessMessage('')
        setErrorMessage(data.message || 'Failed to reset password')
      }
    } catch (err) {
      // 🌐 Network error case
      setSuccessMessage('')
      setErrorMessage('Network error. Please try again.')
    }
  }

  return (
    // 🎨 Gradient background
    <LinearGradient colors={['#e0f2fe', '#fdf2f8']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.formBox}
      >
        {/* 🏷 Title */}
        <Text style={styles.title}>Set a New Password 🔐</Text>

        {/* 🔒 New password input */}
        <TextInput
          placeholder="New Password"
          placeholderTextColor="#6d628cff"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          style={styles.input}
        />

        {/* 🔒 Confirm password input */}
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#6d628cff"
          secureTextEntry
          onChangeText={setConfirm}
          value={confirm}
          style={styles.input}
        />

        {/* ⚠ Error & ✅ success messages */}
        {errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

        {/* 🔘 Submit button */}
        <Pressable style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </Pressable>

        {/* 🔙 Go back to login */}
        <Pressable style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Back to Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}