import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import styles from '../styles/propertiesStyle';

// Get API base URL from Expo config (use debug URL if available)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

const Properties = () => {
  // State to store property list
  const [properties, setProperties] = useState([]);
  // Loading state for showing spinner until data is fetched
  const [loading, setLoading] = useState(true);
  // Router for navigation
  const router = useRouter();

  /**
   * Fetch all properties from the API
   */
  const fetchProperties = async () => {
    try {
      const response = await fetch(SERVER_URL + '/api/property/all'); // API call
      const data = await response.json(); // Parse JSON
      setProperties(data); // Save property list to state
    } catch (error) {
      console.error('Error fetching properties:', error); // Log errors for debugging
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Fetch properties when the component first mounts
  useEffect(() => {
    fetchProperties();
  }, []);

  // Show loading screen while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8b5cf6" />
        <Text style={styles.loadingText}>Loading properties...</Text>
      </View>
    );
  }

  return (
    // Scrollable list of properties
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {properties.map((property) => (
        <TouchableOpacity
          key={property.id}
          onPress={() => {
            // Navigate to property detail page with ID as a parameter
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
            {/* Horizontal scroll for multiple property images */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imageScrollContainer}
            >
              {property.property_pic_url?.map((url, index) => (
                <Image
                  key={index}
                  source={{ uri: url }} // Image from URL
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            {/* Property details */}
            <Text style={styles.title}>{property.property_name}</Text>
            <Text style={styles.detail}>
              Deal Price: ₹{property.deal_price ?? 'Not specified'}
            </Text>
            <Text style={styles.email}>Owner: {property.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Properties;