import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Constants from 'expo-constants';

const SERVER_URL = Constants.expoConfig?.extra?.DEBUG_SERVER_URL || Constants.expoConfig?.extra?.SERVER_URL;

export default function ResetPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const token = params.token as string; // Safely extract token

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleReset = async () => {
    if (password !== confirm) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    const res = await fetch(`${SERVER_URL}/api/auth/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword: password }),
    });

    const data = await res.json();

    if (res.ok) {
      Alert.alert('Success', 'Password reset successfully');
      router.push('/login');
    } else {
      Alert.alert('Error', data.message || 'Failed to reset password');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Reset your password</Text>
      <TextInput
        placeholder="New Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={{ marginVertical: 10 }}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setConfirm}
        value={confirm}
        style={{ marginVertical: 10 }}
      />
      <Button title="Reset Password" onPress={handleReset} />
    </View>
  );
}