import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles/resetPasswordStyles';

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function ResetPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const token = params.token as string;

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleReset = async () => {
    if (!password || !confirm) {
      setErrorMessage('All fields are required');
      setSuccessMessage('');
      return;
    }

    if (password !== confirm) {
      setErrorMessage('Passwords do not match');
      setSuccessMessage('');
      return;
    }

    try {
      const res = await fetch(`${SERVER_URL}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password }),
      });

      const data = await res.json();

      if (res.ok) {
        setErrorMessage('');
        setSuccessMessage('Password reset successfully');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setSuccessMessage('');
        setErrorMessage(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setSuccessMessage('');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#e0f2fe', '#fdf2f8']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.formBox}
      >
        <Text style={styles.title}>Set a New Password 🔐</Text>

        <TextInput
          placeholder="New Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setConfirm}
          value={confirm}
          style={styles.input}
        />

        {errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

        <Pressable style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Back to Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
