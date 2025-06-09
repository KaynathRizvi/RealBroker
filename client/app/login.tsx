import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/loginStyles';
import Constants from 'expo-constants';

const SERVER_URL: string =
  Constants.expoConfig?.extra?.SERVER_URL ?? 'http://localhost:5000';

console.log(SERVER_URL);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter email and password');
      return;
    }

    try {
      const res = await fetch(SERVER_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setErrorMessage('');  // clear any previous error
        await AsyncStorage.setItem('token', data.token);
        router.replace('/home');
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <Text style={styles.title}>Login Page</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input}
      />

      {/* Inline error message */}
      {errorMessage ? (
        <Text style={{ color: 'red', marginVertical: 8 }}>{errorMessage}</Text>
      ) : null}

      <View style={styles.button} >
        <Button title="Login" onPress={login} />
        <Button title="Go to Register" onPress={() => router.push('/register')} />
      </View>
    </View>
  );
}
