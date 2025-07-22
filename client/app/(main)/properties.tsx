import React, { useEffect, useState } from 'react';
import { Stack } from "expo-router";
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import styles from '../styles/propertiesStyle';

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const response = await fetch(SERVER_URL + '/api/property/all');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading properties...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {properties.map((property) => (
        <View key={property.property_id} style={styles.card}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScrollContainer}>
            {property.property_pic_url?.map((url, index) => (
              <Image
                key={index}
                source={{ uri: url }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <Text style={styles.title}>{property.property_name}</Text>
          <Text style={styles.detail}>Price: ₹{property.deal_price ?? 'Not specified'}</Text>
          <Text style={styles.email}>Owner: {property.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Properties;
