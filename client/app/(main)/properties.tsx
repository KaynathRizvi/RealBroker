import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import styles from '../styles/propertiesStyle';

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8b5cf6" />
        <Text style={styles.loadingText}>Loading properties...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {properties.map((property) => (
        <TouchableOpacity
          key={property.id}
          onPress={() => {
            if (property.id != null) {
              router.push({
                pathname: "/(main)/propertyDetail",
                params: { id: property.id.toString() },
              });
            } else {
              console.warn("id is undefined for property:", property);
            }
          }}
        >
          <View style={styles.card}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imageScrollContainer}
            >
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
            <Text style={styles.detail}>Deal Price: ₹{property.deal_price ?? 'Not specified'}</Text>
            <Text style={styles.email}>Owner: {property.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Properties;
