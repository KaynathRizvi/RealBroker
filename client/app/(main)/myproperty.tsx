import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, FlatList, Image, Alert, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import styles from '../styles/mypropertyStyles';

// Get server URL from Expo config
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

// Type definition for a property object
type Property = {
  id: number;
  property_name: string;
  deal_price: string;
  property_pic_url: string[];
  property_desc?: string;
};

export default function MyProperty() {
  // State to store all fetched properties
  const [properties, setProperties] = useState<Property[]>([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);

  // States for new property form inputs
  const [newPropName, setNewPropName] = useState('');
  const [newPropPrice, setNewPropPrice] = useState('');
  const [newPropPicUrl, setNewPropPicUrl] = useState('');
  const [newPropDesc, setNewPropDesc] = useState('');

  // Validation error messages
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    desc: '',
    picUrl: '',
  });

  // States for delete confirmation modal
  const [modalVisible, setModalVisible] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);

  // Fetch properties when component mounts
  useEffect(() => {
    fetchProperties();
  }, []);

  /**
   * Fetch the user's properties from the backend
   */
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

  /**
   * Validate form fields before submission
   */
  function validateField(field: string, value: string) {
    let message = '';

    if (value.trim() === '') {
      message = 'This field cannot be empty';
    } else if (field === 'price' && !/^\d+(\.\d{1,2})?$/.test(value)) {
      message = 'Price must be a number';
    } else if (field === 'picUrl') {
      // Validate each image URL for allowed formats
      const urls = value.trim().split(/\s+/);
      const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

      const invalidUrl = urls.find(url => !imageRegex.test(url));
      if (invalidUrl) {
        message = 'Invalid image type: only JPG, PNG, GIF, BMP, WEBP allowed';
      }
    }

    setErrors(prev => ({ ...prev, [field]: message }));
  }

  /**
   * Add a new property
   */
  async function addProperty() {
    // Run validation on all fields
    validateField('name', newPropName);
    validateField('price', newPropPrice);
    validateField('desc', newPropDesc);
    validateField('picUrl', newPropPicUrl);

    // Prevent submission if there are errors or missing fields
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
        // Send property data to backend
        body: JSON.stringify({
          property_name: newPropName.trim(),
          deal_price: parseFloat(newPropPrice),
          property_pic_url: newPropPicUrl.trim().split(/\s+/),
          property_desc: newPropDesc.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Add the new property to the local list
        setProperties(prev => [...prev, data]);
        // Reset form fields
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

  /**
   * Open delete confirmation modal
   */
  function confirmDeleteProperty(id: number) {
    setPropertyToDelete(id);
    setModalVisible(true);
  }

  /**
   * Delete the selected property after confirmation
   */
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
        // Remove property from state
        setProperties(prev => prev.filter(prop => prop.id !== propertyToDelete));
        Alert.alert('Deleted', 'Property removed');
      } else {
        Alert.alert('Error', data.message || 'Failed to delete property');
      }
    } catch {
      Alert.alert('Error', 'Network error');
    } finally {
      // Close modal and reset state
      setModalVisible(false);
      setPropertyToDelete(null);
    }
  }

  /**
   * Render each property card in the list
   */
  const renderProperty = ({ item }: { item: Property }) => (
    <View style={styles.propertyCard}>
      {/* Display property images */}
      <View style={styles.imageWrapper}>
        {item.property_pic_url.map((url, index) => (
          <Image key={index} source={{ uri: url }} style={styles.thumbnail} resizeMode="cover" />
        ))}
      </View>

      {/* Property details */}
      <Text style={styles.text}>Name: {item.property_name}</Text>
      <Text style={styles.text}>Price: ${item.deal_price}</Text>
      {item.property_desc && <Text style={styles.text}>Description: {item.property_desc}</Text>}

      {/* Delete button */}
      <View style={{ marginTop: 5 }}>
        <Pressable style={styles.deleteButton} onPress={() => confirmDeleteProperty(item.id)}>
          <Text style={styles.deleteButtonText}>Delete This Property</Text>
        </Pressable>
      </View>
    </View>
  );

  // Show loading message while fetching
  if (loading) return <Text style={styles.text}>Loading properties...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Properties</Text>

      {/* List of user's properties */}
      <FlatList
        data={properties}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProperty}
        style={styles.list}
      />

      {/* Form to add a new property */}
      <Text style={styles.subtitle}>Add New Property</Text>

      {/* Property Name Input */}
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

      {/* Deal Price Input */}
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

      {/* Property Description Input */}
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

      {/* Property Image URLs Input */}
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

      {/* Add Property Button */}
      <Pressable style={styles.button} onPress={addProperty}>
        <Text style={styles.buttonText}>Add Property</Text>
      </Pressable>

      {/* Delete Confirmation Modal */}
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
              {/* Cancel Delete */}
              <Pressable
                style={[styles.modalButton, { backgroundColor: 'gray' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </Pressable>
              {/* Confirm Delete */}
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