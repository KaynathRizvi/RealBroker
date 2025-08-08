import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/request-contactStyles';

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (key: string, value: string) => {
    if (key === 'contact') {
      // allow only numbers
      value = value.replace(/[^0-9]/g, '');
    }
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'This field is required';
    if (!form.agency.trim()) newErrors.agency = 'This field is required';
    if (!form.contact.trim()) newErrors.contact = 'This field is required';
    if (!form.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!property_id) {
      Alert.alert("Error", "Missing property ID");
      return;
    }

    if (!validateFields()) {
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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          property_id,
          name: form.name,
          agency: form.agency,
          phone: form.contact,
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
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.formCard}>
        <Text style={styles.title}>Contact Property Owner</Text>

        <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={form.name}
          onChangeText={(t) => handleChange('name', t)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Agency Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter agency name"
          value={form.agency}
          onChangeText={(t) => handleChange('agency', t)}
        />
        {errors.agency && <Text style={styles.errorText}>{errors.agency}</Text>}

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter contact number"
          keyboardType="numeric"
          value={form.contact}
          onChangeText={(t) => handleChange('contact', t)}
        />
        {errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}

        <Text style={styles.label}>Email ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(t) => handleChange('email', t)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Write your message"
          multiline
          value={form.message}
          onChangeText={(t) => handleChange('message', t)}
        />

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send Request</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
