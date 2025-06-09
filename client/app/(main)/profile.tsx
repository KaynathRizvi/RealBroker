import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/profileStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

type Property = {
  id: number;
  property_name: string;
  deal_price: string;
  property_pic_url: string;
};

type Profile = {
  name: string;
  agency_name: string;
  contact_number: string;
  license_number: string;
  email: string;
  location: string;
  properties: Property[];
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({
    name: '',
    agency_name: '',
    contact_number: '',
    license_number: '',
    email: '',
    location: '',
    properties: [],
  });
  const [loading, setLoading] = useState(true);

  const [newPropName, setNewPropName] = useState('');
  const [newPropPrice, setNewPropPrice] = useState('');
  const [newPropPicUrl, setNewPropPicUrl] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Sending token:', token);
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        setLoading(false);
        return;
      }

      // Decode token to get email and set it immediately
      const decoded: any = jwtDecode(token);
      const userEmail = decoded.email || '';
      
      // Set email right away to avoid null email in UI
      setProfile(prev => ({ ...prev, email: userEmail }));

      // Fetch full profile from backend
      const res = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        // Make sure email stays in sync (backend might send it too)
        setProfile(prev => ({ ...data, email: userEmail }));
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch profile');
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
      const res = await fetch('http://localhost:5000/api/profile', {
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
          // don't send email here as it's not editable
        }),
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'Profile saved');
      } else {
        Alert.alert('Error', data.message || 'Failed to save profile');
      }
    } catch {
      Alert.alert('Error', 'Network error');
    }
  }

  async function addProperty() {
    if (!newPropName || !newPropPrice) {
      Alert.alert('Error', 'Please enter property name and deal price');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        return;
      }
      const res = await fetch('http://localhost:5000/api/profile/property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          property_name: newPropName,
          deal_price: parseFloat(newPropPrice),
          property_pic_url: newPropPicUrl,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(prev => ({
          ...prev,
          properties: [...prev.properties, data],
        }));
        setNewPropName('');
        setNewPropPrice('');
        setNewPropPicUrl('');
        Alert.alert('Success', 'Property added');
      } else {
        Alert.alert('Error', data.message || 'Failed to add property');
      }
    } catch {
      Alert.alert('Error', 'Network error');
    }
  }

  function renderProperty({ item }: { item: Property }) {
    return (
      <View style={{ marginBottom: 15, borderWidth: 1, padding: 10, borderRadius: 8 }}>
        {item.property_pic_url ? (
          <Image source={{ uri: item.property_pic_url }} style={{ width: 100, height: 100, marginBottom: 5 }} />
        ) : null}
        <Text>Name: {item.property_name}</Text>
        <Text>Price: ${item.deal_price}</Text>
      </View>
    );
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>

      <Text>Email (not editable):</Text>
      <TextInput value={profile.email} editable={false} style={[styles.input, { backgroundColor: '#ddd' }]} />

      <Text>Name:</Text>
      <TextInput
        value={profile.name}
        onChangeText={text => setProfile(prev => ({ ...prev, name: text }))}
        style={styles.input}
      />

      <Text>Agency Name:</Text>
      <TextInput
        value={profile.agency_name}
        onChangeText={text => setProfile(prev => ({ ...prev, agency_name: text }))}
        style={styles.input}
      />

      <Text>Contact Number:</Text>
      <TextInput
        value={profile.contact_number}
        onChangeText={text => setProfile(prev => ({ ...prev, contact_number: text }))}
        style={styles.input}
      />

      <Text>License Number:</Text>
      <TextInput
        value={profile.license_number}
        onChangeText={text => setProfile(prev => ({ ...prev, license_number: text }))}
        style={styles.input}
      />

      <Text>Location:</Text>
      <TextInput
        value={profile.location}
        onChangeText={text => setProfile(prev => ({ ...prev, location: text }))}
        style={styles.input}
      />

      <Button title="Save Profile" onPress={saveProfile} />

      <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 18 }}>Properties</Text>

      <FlatList
        data={profile.properties}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProperty}
        style={{ marginBottom: 20 }}
      />

      <Text style={{ fontWeight: 'bold' }}>Add New Property</Text>
      <TextInput
        placeholder="Property Name"
        value={newPropName}
        onChangeText={setNewPropName}
        style={styles.input}
      />
      <TextInput
        placeholder="Deal Price"
        value={newPropPrice}
        onChangeText={setNewPropPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Property Picture URL"
        value={newPropPicUrl}
        onChangeText={setNewPropPicUrl}
        style={styles.input}
      />
      <Button title="Add Property" onPress={addProperty} />
    </ScrollView>
  );
}
