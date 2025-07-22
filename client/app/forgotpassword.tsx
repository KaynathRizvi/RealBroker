// app/forgot-password.tsx
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Constants from 'expo-constants';

const SERVER_URL = Constants.expoConfig?.extra?.DEBUG_SERVER_URL || Constants.expoConfig?.extra?.SERVER_URL;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

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
    <View style={{ padding: 20 }}>
      <Text>Enter your email to reset password</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <Button title="Send Reset Email" onPress={handleReset} />
    </View>
  );
}
