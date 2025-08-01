import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import styles from '../styles/profileStyles';
import MyProperty from './myproperty';

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

type Profile = {
  name: string;
  agency_name: string;
  contact_number: string;
  license_number: string;
  email: string;
  location: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    agency_name: '',
    contact_number: '',
    license_number: '',
    email: '',
    location: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        setLoading(false);
        return;
      }

      const res = await fetch(`${SERVER_URL}/api/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data) {
      setProfile(prev => ({
        ...prev,
        ...data,
      email: data.email || prev.email,
      }));
      } else {
      Alert.alert('Error', data?.message || 'Failed to fetch profile');
    }
    } catch (error) {
      Alert.alert('Error', 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        return;
      }

      const res = await fetch(`${SERVER_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          agency_name: profile.agency_name,
          contact_number: profile.contact_number,
          license_number: profile.license_number,
          location: profile.location,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'Profile saved');
      } else {
        Alert.alert('Error', data.message || 'Failed to save profile');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error');
    }
  }

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (!profile) return <Text style={styles.text}>Profile not available</Text>;
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>

      <Text style={styles.label}>Email (not editable):</Text>
      <TextInput
        value={profile.email}
        editable={false}
        style={[styles.input, styles.disabledInput]}
      />

      <Text style={styles.label}>Name:</Text>
      <TextInput
        value={profile.name}
        onChangeText={(text) => setProfile((prev) => ({ ...prev, name: text }))}
        style={styles.input}
      />

      <Text style={styles.label}>Agency Name:</Text>
      <TextInput
        value={profile.agency_name}
        onChangeText={(text) => setProfile((prev) => ({ ...prev, agency_name: text }))}
        style={styles.input}
      />

      <Text style={styles.label}>Contact Number:</Text>
      <TextInput
        value={profile.contact_number}
        onChangeText={(text) => setProfile((prev) => ({ ...prev, contact_number: text }))}
        style={styles.input}
      />

      <Text style={styles.label}>License Number:</Text>
      <TextInput
        value={profile.license_number}
        onChangeText={(text) => setProfile((prev) => ({ ...prev, license_number: text }))}
        style={styles.input}
      />

      <Text style={styles.label}>Location:</Text>
      <TextInput
        value={profile.location}
        onChangeText={(text) => setProfile((prev) => ({ ...prev, location: text }))}
        style={styles.input}
      />

      <Button title="Save Profile" onPress={saveProfile} />
      <MyProperty />
    </ScrollView>
  );
}
