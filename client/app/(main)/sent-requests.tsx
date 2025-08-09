import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { jwtDecode } from 'jwt-decode'; // Used to decode the JWT token
import { LinearGradient } from "expo-linear-gradient";
import styles from '../styles/sentRequestStyles';

// Get the backend API URL from environment variables (either debug or production)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

// Type definition for decoded JWT token
interface DecodedToken {
  userId: number;
}

const SentRequests = () => {
  // Store list of sent requests
  const [requests, setRequests] = useState<any[]>([]);
  // Loading state for API fetch
  const [loading, setLoading] = useState(true);
  // Tracks which request is expanded to show details
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Fetch all contact requests sent by the logged-in user
  const fetchSentRequests = async () => {
    try {
      // Retrieve saved auth token from local storage
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token');

      // Decode JWT to extract the user ID (if needed later)
      const decoded: DecodedToken = jwtDecode(token);
      const userId = decoded.userId; // Currently unused but kept for reference

      // API call to fetch sent requests
      const res = await fetch(`${SERVER_URL}/api/request-contact/sent-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Parse JSON response
      const data = await res.json();
      setRequests(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Toggles the expanded state of a specific request card
  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Fetch requests on first render
  useEffect(() => {
    fetchSentRequests();
  }, []);

  // Show loading spinner while fetching
  if (loading) {
    return (
      <LinearGradient colors={["#fdf2f8", "#eceffeff"]} style={styles.gradient}>
        <ActivityIndicator size="large" style={styles.loading} />
      </LinearGradient>
    );
  }

  // Show message if no requests were found
  if (requests.length === 0) {
    return (
      <LinearGradient colors={["#fdf2f8", "#eceffeff"]} style={styles.gradient}>
        <Text style={styles.noRequests}>You haven't sent any contact requests.</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#fdf2f8", "#eceffeff"]} style={styles.gradient}>
      <FlatList
        data={requests}
        keyExtractor={(item, index) =>
          item.request_id ? item.request_id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Header row with property name & request status */}
            <TouchableOpacity onPress={() => toggleExpand(item.request_id)}>
              <View style={styles.headerRow}>
                <Text style={styles.property}>{item.property_name}</Text>
                <Text
                  style={[
                    styles.status,
                    item.status === 'accepted'
                      ? styles.accepted
                      : item.status === 'rejected'
                      ? styles.rejected
                      : styles.pending,
                  ]}
                >
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Expanded section showing more details */}
            {expandedId === item.request_id && (
              <View style={styles.details}>
                {item.status === 'accepted' ? (
                  <>
                    <Text style={styles.detailText}>💬 Message: Hello, let's connect!</Text>
                    <Text style={styles.detailText}>👤 Owner Name: {item.owner_name}</Text>
                    <Text style={styles.detailText}>📧 Email: {item.owner_email}</Text>
                    <Text style={styles.detailText}>📱 Contact: {item.owner_contact}</Text>
                  </>
                ) : (
                  <Text style={styles.waitingText}>
                    You will see owner details once the request is accepted.
                  </Text>
                )}
              </View>
            )}
          </View>
        )}
      />
    </LinearGradient>
  );
};

export default SentRequests;