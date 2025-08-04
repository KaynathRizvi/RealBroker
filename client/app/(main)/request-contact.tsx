import React, { useState } from 'react';
import { Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/request-contactStyles'; // your existing styles

const SERVER_URL = Constants.expoConfig?.extra?.DEBUG_SERVER_URL || Constants.expoConfig?.extra?.SERVER_URL;

export default function RequestContact() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const property_id = Array.isArray(id) ? id[0] : id;

  const [form, setForm] = useState({
    name: '',
    agency: '',
    contact: '',
    email: '',
    message: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!property_id) {
      Alert.alert("Error", "Missing property ID");
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert("Unauthorized", "Please log in to send a contact request.");
        return;
      }

      const res = await fetch(`${SERVER_URL}/api/request-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ✅ include token
        },
        body: JSON.stringify({
          property_id,
          name: form.name,
          agency: form.agency,
          phone: form.contact,     // ✅ map to expected backend field
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send request');
      }

      Alert.alert("Success", "Contact request sent!");
      router.push('/properties');
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Property Owner</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Agency Name"
        value={form.agency}
        onChangeText={(text) => handleChange('agency', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="phone-pad"
        value={form.contact}
        onChangeText={(text) => handleChange('contact', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email ID"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Message"
        multiline
        value={form.message}
        onChangeText={(text) => handleChange('message', text)}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Request</Text>
      </Pressable>
    </ScrollView>
  );
}
