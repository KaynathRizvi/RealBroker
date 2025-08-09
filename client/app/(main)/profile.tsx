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

// Get server URL from Expo config (debug or production)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

// Type definition for Profile object
type Profile = {
  name: string;
  agency_name: string;
  contact_number: string;
  license_number: string;
  email: string;
  location: string;
};

export default function ProfilePage() {
  // Profile state
  const [profile, setProfile] = useState<Profile>({
    name: '',
    agency_name: '',
    contact_number: '',
    license_number: '',
    email: '',
    location: '',
  });

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Validation error messages for each field
  const [errors, setErrors] = useState({
    name: '',
    agency: '',
    contact: '',
    location: '',
  });

  // Fetch profile once on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  /**
   * Fetch user profile from API
   */
  async function fetchProfile() {
    try {
      // Retrieve saved token
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        setLoading(false);
        return;
      }

      // Send GET request to fetch profile data
      const res = await fetch(`${SERVER_URL}/api/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data) {
        // Merge API response with existing profile state
        setProfile(prev => ({
          ...prev,
          ...data,
          email: data.email || prev.email, // Keep previous email if not returned
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

  /**
   * Validate individual fields
   */
  function validateField(field: string, value: string) {
    let message = '';

    // Required field check (except license)
    if (value.trim() === '' && field !== 'license') {
      message = 'This field cannot be empty';
    }
    // Number-only check for contact & license
    else if ((field === 'contact' || field === 'license') && !/^\d*$/.test(value)) {
      message = 'Must contain only numbers';
    }

    // Update error state
    setErrors(prev => ({ ...prev, [field]: message }));

    // Return true if valid (no error message)
    return message === '';
  }

  /**
   * Save updated profile to API
   */
  async function saveProfile() {
    const { name, agency_name, contact_number, location } = profile;

    // Validate all required fields before submission
    const isNameValid = validateField('name', name);
    const isAgencyValid = validateField('agency', agency_name);
    const isContactValid = validateField('contact', contact_number);
    const isLocationValid = validateField('location', location);

    if (!isNameValid || !isAgencyValid || !isContactValid || !isLocationValid) {
      return; // Stop if any field is invalid
    } else {
      setError(null);
    }

    try {
      // Retrieve saved token
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        return;
      }

      // Send PUT request to update profile
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
        // Slight delay before showing alert for smoother UX
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

  // Show loading spinner while fetching profile
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

        {/* Display general error */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Email (read-only) */}
        <Text style={styles.label}>Email (not editable):</Text>
        <TextInput
          value={profile.email}
          editable={false}
          style={[styles.input, styles.disabledInput]}
        />

        {/* Name */}
        <Text style={styles.label}>Name*:</Text>
        <TextInput
          value={profile.name}
          onChangeText={text => {
            setProfile(prev => ({ ...prev, name: text }));
            validateField('name', text);
          }}
          style={styles.input}
          placeholder="Enter your full name"
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        {/* Agency Name */}
        <Text style={styles.label}>Agency Name*:</Text>
        <TextInput
          value={profile.agency_name}
          onChangeText={text => {
            setProfile(prev => ({ ...prev, agency_name: text }));
            validateField('agency', text);
          }}
          style={styles.input}
          placeholder="Enter your agency name"
        />
        {errors.agency ? <Text style={styles.errorText}>{errors.agency}</Text> : null}

        {/* Contact Number */}
        <Text style={styles.label}>Contact Number*:</Text>
        <TextInput
          value={profile.contact_number}
          onChangeText={text => {
            // Strip out any non-numeric characters
            const numericValue = text.replace(/[^0-9]/g, '');
            setProfile(prev => ({ ...prev, contact_number: numericValue }));
            validateField('contact', numericValue);
          }}
          style={styles.input}
          placeholder="Enter your contact number"
          keyboardType="number-pad"
        />
        {errors.contact ? <Text style={styles.errorText}>{errors.contact}</Text> : null}

        {/* License Number (optional) */}
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

        {/* Location */}
        <Text style={styles.label}>Location*:</Text>
        <TextInput
          value={profile.location}
          onChangeText={text => {
            setProfile(prev => ({ ...prev, location: text }));
            validateField('location', text);
          }}
          style={styles.input}
          placeholder="Enter your city or region"
        />
        {errors.location ? <Text style={styles.errorText}>{errors.location}</Text> : null}

        {/* Save button */}
        <Pressable style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </Pressable>

        {/* MyProperty Component */}
        <View style={{ marginTop: 30 }}>
          <MyProperty />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}