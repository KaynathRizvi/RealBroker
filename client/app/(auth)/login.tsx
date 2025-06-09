import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View, Alert } from 'react-native';
import Constants from 'expo-constants';
import styles from '../styles/loginStyles';

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage('');
        Alert.alert('Success', 'Logged in successfully!');
        router.replace('/home');
      } else {
        console.log('Login error:', data.message);
        setErrorMessage(data.message || 'Login failed');
        setPassword('');
      }
    } catch (error) {
      Alert.alert('Network error', (error as Error).message || 'Unknown error');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <Text>Login Page</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      {errorMessage ? <Text style={{ color: 'red', marginVertical: 10 }}>{errorMessage}</Text> : null}
      <View style={styles.button}>
        <Button title="Login" onPress={login} />
        <Button title="Go to Register" onPress={() => router.push('/register')} />
      </View>
    </View>
  );
}
