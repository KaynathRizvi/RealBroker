import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View, Alert } from 'react-native';
import styles from '../styles/registerStyles';
import Constants from 'expo-constants';

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await fetch(SERVER_URL + '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage('');
        Alert.alert('Success', 'Registered successfully!');
        router.replace('/home');
      } else {
        console.log('Showing error alert with message:', data.message);
        setErrorMessage(data.message || 'Something went wrong');
        setPassword('');
      }
    } catch (error) {
      Alert.alert('Network error', (error as Error).message || 'Unknown error');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Register' }} />
      <Text>Register Page</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      {errorMessage ? <Text style={{ color: 'red', marginVertical: 10 }}>{errorMessage}</Text> : null}
      <View style={styles.button}>
        <Button title="Register" onPress={register} />
        <Button title="Go to Login" onPress={() => router.push('/login')} />
      </View>
    </View>
  );
}
