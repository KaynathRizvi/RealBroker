import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator, Alert, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Constants from "expo-constants";
import styles from "../styles/propertyDetailStyles";

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL || Constants.expoConfig?.extra?.SERVER_URL;

export default function PropertyDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  console.log("Received ID:", id);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/property/${id}`);
      const data = await res.json();

      let imageArray = [];

      if (typeof data.property_pic_url === "string") {
        try {
          imageArray = JSON.parse(data.property_pic_url);
        } catch {
          imageArray = [];
        }
      } else if (Array.isArray(data.property_pic_url)) {
        imageArray = data.property_pic_url;
      }

      setProperty({
        ...data,
        property_pic_url: imageArray,
      });
    } catch (err) {
      console.error("Failed to load property detail:", err);
      Alert.alert("Error", "Could not load property detail.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      Alert.alert("Missing ID", "No property ID provided.");
      router.back();
      return;
    }
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading property detail...</Text>
      </View>
    );
  }

  if (!property) {
    return (
      <View style={styles.center}>
        <Text>Property not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScrollContainer}>
        {property.property_pic_url.map((url: string, idx: number) => (
          <Image
            key={idx}
            source={{ uri: url }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <Text style={styles.title}>{property.property_name}</Text>
      <Text style={styles.detail}>Price: ₹{property.deal_price}</Text>
      <Text style={styles.detail}>
        Owner: {property.owner_name ?? "N/A"} ({property.owner_email ?? "N/A"})
      </Text>
      <Text style={styles.description}>
        {property.property_desc || "No description available."}
      </Text>

      <Pressable style={styles.requestButton}
        onPress={() => router.push(`/request-contact?id=${id}`)}>
        <Text style={styles.requestButtonText}>Request Contact</Text>
      </Pressable>
      <Pressable style={styles.backButton} onPress={() => router.push('/properties')}> 
        <Text style={styles.backButtonText}>Go Back</Text>
      </Pressable>
    </ScrollView>
  );
}
