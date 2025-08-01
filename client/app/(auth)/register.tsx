import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Button, Text, TextInput, View, Alert } from 'react-native';
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
        router.replace('/login');
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
      <Text style={styles.title}>Register Page</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      
      {errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}
        
        <Pressable style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </Pressable>
    </View>
  );
}
