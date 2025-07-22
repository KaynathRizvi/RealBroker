// app/forgot-password.tsx
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import styles from './styles/forgotpasswordStyles';

const SERVER_URL = Constants.expoConfig?.extra?.DEBUG_SERVER_URL || Constants.expoConfig?.extra?.SERVER_URL;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleReset = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      Alert.alert('Info', data.message || 'Check your email for reset link');
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your email to reset password</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <Button title="Send Reset Email" onPress={handleReset} />
      <Button title="Go Back to Login" onPress={() => router.push('/login')} />
    </View>
  );
}
