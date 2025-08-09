import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator, Alert, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Constants from "expo-constants";
import styles from "../styles/propertyDetailStyles";

// Get API base URL from Expo config (debug or production)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL || Constants.expoConfig?.extra?.SERVER_URL;

export default function PropertyDetail() {
  const router = useRouter(); // For navigation
  const { id } = useLocalSearchParams(); // Get the property ID from the URL
  const [property, setProperty] = useState<any>(null); // Store property details
  const [loading, setLoading] = useState(true); // Loading state

  /**
   * Fetch the property detail from API
   */
  const fetchDetail = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/property/${id}`); // API request for specific property
      const data = await res.json();

      let imageArray = [];

      // Ensure property_pic_url is always an array
      if (typeof data.property_pic_url === "string") {
        try {
          imageArray = JSON.parse(data.property_pic_url); // Parse if it's a JSON string
        } catch {
          imageArray = []; // Default to empty array if parsing fails
        }
      } else if (Array.isArray(data.property_pic_url)) {
        imageArray = data.property_pic_url;
      }

      // Save property data with image array
      setProperty({
        ...data,
        property_pic_url: imageArray,
      });
    } catch (err) {
      Alert.alert("Error", "Could not load property detail.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  /**
   * Fetch data when component mounts or when ID changes
   */
  useEffect(() => {
    if (!id) {
      // If there's no ID in URL, show error and go back
      Alert.alert("Missing ID", "No property ID provided.");
      router.back();
      return;
    }
    fetchDetail();
  }, [id]);

  // Show loading spinner while fetching
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#a78bfa" />
        <Text>Loading property detail...</Text>
      </View>
    );
  }

  // If no property found after fetch
  if (!property) {
    return (
      <View style={styles.center}>
        <Text>Property not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Horizontal scroll for property images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageScrollContainer}
      >
        {property.property_pic_url.map((url: string, idx: number) => (
          <Image
            key={idx}
            source={{ uri: url }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Property main details */}
      <Text style={styles.title}>{property.property_name}</Text>
      <Text style={styles.detail}>Price: ₹{property.deal_price}</Text>
      <Text style={styles.detail}>
        Owner: {property.owner_name ?? "N/A"} ({property.owner_email ?? "N/A"})
      </Text>

      {/* Property description */}
      <Text style={styles.description}>
        {property.property_desc || "No description available."}
      </Text>

      {/* Request contact button */}
      <Pressable
        style={styles.requestButton}
        onPress={() => router.push(`/request-contact?id=${id}`)}
      >
        <Text style={styles.requestButtonText}>Request Contact</Text>
      </Pressable>

      {/* Back button */}
      <Pressable style={styles.backButton} onPress={() => router.push('/properties')}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </Pressable>
    </ScrollView>
  );
}
