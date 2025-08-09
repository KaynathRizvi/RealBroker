import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/viewSubscriptionStyles";

// Determine backend server URL from Expo config (supports debug and production modes)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function ViewSubscription() {
  const router = useRouter(); // Used for navigation
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null); // Holds subscription details
  const [loading, setLoading] = useState(true); // Tracks loading state

  // Fetch subscription info on first render
  useEffect(() => {
    fetchSubscriptionInfo();
  }, []);

  // Function to fetch subscription info from backend
  const fetchSubscriptionInfo = async () => {
    try {
      // Retrieve stored JWT token
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        // If no token found → redirect to login
        router.replace("/login");
        return;
      }

      // Call API to get subscription status
      const response = await fetch(`${SERVER_URL}/api/subscription/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // If token is invalid or expired → log out and redirect
      if (response.status === 401) {
        await AsyncStorage.removeItem("token");
        Alert.alert("Session expired", "Please log in again.");
        router.replace("/login");
        return;
      }

      // Parse API response
      const data = await response.json();

      if (data.hasActiveSubscription) {
        // Store subscription details
        setSubscriptionInfo(data.subscription);
      } else {
        // If no active subscription → alert and redirect to subscription purchase page
        Alert.alert("No Active Subscription", "You don't have an active plan.");
        router.replace("/subscription");
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Error fetching subscription:", error);
      Alert.alert("Error", "Failed to load subscription info.");
    } finally {
      // Stop showing loading spinner
      setLoading(false);
    }
  };

  // Show loading spinner while fetching subscription data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a5acd" />
      </View>
    );
  }

  // Show subscription details
  return (
    <LinearGradient
      colors={["#fdf8ff", "#ffe4f0"]}
      style={styles.gradientBackground}
    >
      <Text style={styles.title}>📄 My Subscription</Text>

      <View style={styles.card}>
        {/* Subscription Plan */}
        <View style={styles.row}>
          <Text style={styles.label}>Plan</Text>
          <Text style={styles.valueText}>{subscriptionInfo.planName}</Text>
        </View>

        {/* Price */}
        <View style={styles.row}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.valueText}>${subscriptionInfo.planPrice}</Text>
        </View>

        {/* Duration */}
        <View style={styles.row}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.valueText}>
            {subscriptionInfo.planDuration} days
          </Text>
        </View>

        {/* Purchase Date */}
        <View style={styles.row}>
          <Text style={styles.label}>Purchase Date</Text>
          <Text style={styles.valueText}>
            {new Date(subscriptionInfo.purchaseDate).toLocaleDateString()}
          </Text>
        </View>

        {/* Expiry Date */}
        <View style={styles.row}>
          <Text style={styles.label}>Expiry Date</Text>
          <Text style={styles.valueText}>
            {new Date(subscriptionInfo.expiryDate).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
