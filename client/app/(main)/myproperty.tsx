import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import styles from '../styles/profileStyles';

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

type Property = {
  id: number;
  property_name: string;
  deal_price: string;
  property_pic_url: string;
};

export default function MyPropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [newPropName, setNewPropName] = useState('');
  const [newPropPrice, setNewPropPrice] = useState('');
  const [newPropPicUrl, setNewPropPicUrl] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }

      const res = await fetch(`${SERVER_URL}/api/property`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setProperties(data);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch properties');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function addProperty() {
    if (!newPropName || !newPropPrice) {
      Alert.alert('Error', 'Please enter property name and price');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/api/property`, {
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
        setProperties(prev => [...prev, data]);
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
          <Image source={{ uri: item.property_pic_url }} style={{ width: 100, height: 100 }} />
        ) : null}
        <Text>Name: {item.property_name}</Text>
        <Text>Price: ${item.deal_price}</Text>
      </View>
    );
  }

  if (loading) return <Text>Loading properties...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Properties</Text>

      <FlatList
        data={properties}
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
