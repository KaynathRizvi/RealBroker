import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, FlatList, Image, Alert, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import styles from '../styles/mypropertyStyles';

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

type Property = {
  id: number;
  property_name: string;
  deal_price: string;
  property_pic_url: string[];
  property_desc?: string;
};

export default function MyProperty() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [newPropName, setNewPropName] = useState('');
  const [newPropPrice, setNewPropPrice] = useState('');
  const [newPropPicUrl, setNewPropPicUrl] = useState('');
  const [newPropDesc, setNewPropDesc] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    desc: '',
    picUrl: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);

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
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setProperties(data);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch properties');
      }
    } catch {
      Alert.alert('Error', 'Network error');
    } finally {
      setLoading(false);
    }
  }

  function validateField(field: string, value: string) {
    let message = '';

    if (value.trim() === '') {
      message = 'This field cannot be empty';
    } else if (field === 'price' && !/^\d+(\.\d{1,2})?$/.test(value)) {
      message = 'Price must be a number';
    } else if (field === 'picUrl') {
      // Validate each URL for valid image extension
      const urls = value.trim().split(/\s+/);
      const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

      const invalidUrl = urls.find(url => !imageRegex.test(url));
      if (invalidUrl) {
        message = 'Invalid image type: only JPG, PNG, GIF, BMP, WEBP allowed';
      }
    }

    setErrors(prev => ({ ...prev, [field]: message }));
  }

  async function addProperty() {
    validateField('name', newPropName);
    validateField('price', newPropPrice);
    validateField('desc', newPropDesc);
    validateField('picUrl', newPropPicUrl);

    if (
      Object.values(errors).some(err => err !== '') ||
      !newPropName ||
      !newPropPrice ||
      !newPropDesc ||
      !newPropPicUrl
    ) {
      Alert.alert('Error', 'Please fix errors before submitting');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'You are not logged in');
        return;
      }

      const res = await fetch(`${SERVER_URL}/api/property`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          property_name: newPropName.trim(),
          deal_price: parseFloat(newPropPrice),
          property_pic_url: newPropPicUrl.trim().split(/\s+/),
          property_desc: newPropDesc.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setProperties(prev => [...prev, data]);
        setNewPropName('');
        setNewPropPrice('');
        setNewPropPicUrl('');
        setNewPropDesc('');
        setErrors({ name: '', price: '', desc: '', picUrl: '' });
        Alert.alert('Success', 'Property added');
      } else {
        Alert.alert('Error', data.message || 'Failed to add property');
      }
    } catch {
      Alert.alert('Error', 'Network error');
    }
  }

  function confirmDeleteProperty(id: number) {
    setPropertyToDelete(id);
    setModalVisible(true);
  }

  async function handleDeleteConfirmed() {
    if (propertyToDelete === null) return;

    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/api/property/${propertyToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setProperties(prev => prev.filter(prop => prop.id !== propertyToDelete));
        Alert.alert('Deleted', 'Property removed');
      } else {
        Alert.alert('Error', data.message || 'Failed to delete property');
      }
    } catch {
      Alert.alert('Error', 'Network error');
    } finally {
      setModalVisible(false);
      setPropertyToDelete(null);
    }
  }

  const renderProperty = ({ item }: { item: Property }) => (
    <View style={styles.propertyCard}>
      <View style={styles.imageWrapper}>
        {item.property_pic_url.map((url, index) => (
          <Image key={index} source={{ uri: url }} style={styles.thumbnail} resizeMode="cover" />
        ))}
      </View>
      <Text style={styles.text}>Name: {item.property_name}</Text>
      <Text style={styles.text}>Price: ${item.deal_price}</Text>
      {item.property_desc && <Text style={styles.text}>Description: {item.property_desc}</Text>}
      <View style={{ marginTop: 5 }}>
        <Pressable style={styles.deleteButton} onPress={() => confirmDeleteProperty(item.id)}>
          <Text style={styles.deleteButtonText}>Delete This Property</Text>
        </Pressable>
      </View>
    </View>
  );

  if (loading) return <Text style={styles.text}>Loading properties...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Properties</Text>

      <FlatList
        data={properties}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProperty}
        style={styles.list}
      />

      <Text style={styles.subtitle}>Add New Property</Text>

      <TextInput
        placeholder="Property Name"
        value={newPropName}
        onChangeText={text => {
          setNewPropName(text);
          validateField('name', text);
        }}
        style={styles.input}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        placeholder="Deal Price"
        value={newPropPrice}
        onChangeText={text => {
          setNewPropPrice(text);
          validateField('price', text);
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}

      <TextInput
        placeholder="Property Description"
        value={newPropDesc}
        onChangeText={text => {
          setNewPropDesc(text);
          validateField('desc', text);
        }}
        style={styles.input}
      />
      {errors.desc ? <Text style={styles.errorText}>{errors.desc}</Text> : null}

      <TextInput
        placeholder="Property Picture URL(s)"
        value={newPropPicUrl}
        onChangeText={text => {
          setNewPropPicUrl(text);
          validateField('picUrl', text);
        }}
        style={styles.input}
      />
      {errors.picUrl ? <Text style={styles.errorText}>{errors.picUrl}</Text> : null}

      <Pressable style={styles.button} onPress={addProperty}>
        <Text style={styles.buttonText}>Add Property</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.text}>Are you sure you want to delete this property?</Text>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: 'gray' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: 'red' }]}
                onPress={handleDeleteConfirmed}
              >
                <Text style={{ color: 'white' }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
