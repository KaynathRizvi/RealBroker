import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  Alert,
  ScrollView,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import styles from '../styles/profileStyles';
import MyProperty from './myproperty';
import { LinearGradient } from 'expo-linear-gradient';

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
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    agency: '',
    contact: '',
    location: '',
  });

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

  function validateField(field: string, value: string) {
  let message = '';

  if (value.trim() === '' && field !== 'license') {
    message = 'This field cannot be empty';
  } else if ((field === 'contact' || field === 'license') && !/^\d*$/.test(value)) {
    message = 'Must contain only numbers';
  }

  setErrors(prev => ({ ...prev, [field]: message }));
  return message === ''; // valid if no error
}


  async function saveProfile() {
    const { name, agency_name, contact_number, location } = profile;

    const isNameValid = validateField('name', name);
    const isAgencyValid = validateField('agency', agency_name);
    const isContactValid = validateField('contact', contact_number);
    const isLocationValid = validateField('location', location);

    if (!isNameValid || !isAgencyValid || !isContactValid || !isLocationValid) {
      return;
    } else {
      setError(null);
    }

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
          name,
          agency_name,
          contact_number,
          license_number: profile.license_number,
          location,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('✅ Profile updated successfully:', data);
        setTimeout(() => {
          Alert.alert('Success ✅', data.message || 'Your profile has been updated successfully!');
        }, 100);
      } else {
        Alert.alert('Error', data.message || 'Failed to save profile');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error');
    }
  }

  if (loading) {
    return (
      <LinearGradient colors={['#e0f2fe', '#fdf2f8']} style={styles.container}>
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 50 }} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#e0f2fe', '#fdf2f8']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.formBox}>
        <Text style={styles.title}>Your Profile 👤</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.label}>Email (not editable):</Text>
        <TextInput
          value={profile.email}
          editable={false}
          style={[styles.input, styles.disabledInput]}
        />

        <Text style={styles.label}>Name*:</Text>
        <TextInput
          value={profile.name}
          onChangeText={text => { setProfile(prev => ({ ...prev, name: text })); validateField('name', text); }}
          style={styles.input}
          placeholder="Enter your full name"
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <Text style={styles.label}>Agency Name*:</Text>
        <TextInput
          value={profile.agency_name}
          onChangeText={text => { setProfile(prev => ({ ...prev, agency_name: text })); validateField('agency', text); }}
          style={styles.input}
          placeholder="Enter your agency name"
        />
        {errors.agency ? <Text style={styles.errorText}>{errors.agency}</Text> : null}

        <Text style={styles.label}>Contact Number*:</Text>
        <TextInput
          value={profile.contact_number}
          onChangeText={text => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setProfile(prev => ({ ...prev, contact_number: numericValue }));
            validateField('contact', numericValue);
          }}
          style={styles.input}
          placeholder="Enter your contact number"
          keyboardType="number-pad"
        />
        {errors.contact ? <Text style={styles.errorText}>{errors.contact}</Text> : null}

        <Text style={styles.label}>License Number (optional):</Text>
        <TextInput
          value={profile.license_number}
          onChangeText={text => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setProfile(prev => ({ ...prev, license_number: numericValue }));
          }}
          style={styles.input}
          placeholder="Enter your license number (digits only)"
          keyboardType="number-pad"
        />


        <Text style={styles.label}>Location*:</Text>
        <TextInput
          value={profile.location}
          onChangeText={text => { setProfile(prev => ({ ...prev, location: text })); validateField('location', text); }}
          style={styles.input}
          placeholder="Enter your city or region"
        />
        {errors.location ? <Text style={styles.errorText}>{errors.location}</Text> : null}

        <Pressable style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </Pressable>

        <View style={{ marginTop: 30 }}>
          <MyProperty />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
