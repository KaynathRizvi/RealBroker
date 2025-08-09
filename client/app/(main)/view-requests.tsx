import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/viewRequestsStyles';

// Get server URL from Expo config (fallback to DEBUG_SERVER_URL in development)
const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

// Shape of decoded JWT token
interface DecodedToken {
  userId: number;
}

const ViewRequests = () => {
  // State to store fetched requests
  const [requests, setRequests] = useState<any[]>([]);
  // Loading indicator
  const [loading, setLoading] = useState(true);
  // Track which request card is expanded for details
  const [expandedId, setExpandedId] = useState<number | null>(null);

  /**
   * Fetch all contact requests for the logged-in owner
   */
  const fetchRequests = async () => {
    setLoading(true);
    try {
      // Get stored JWT token
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      // Decode token to extract user ID (if needed)
      const decoded: DecodedToken = jwtDecode(token);
      const userId = decoded.userId;

      // Fetch contact requests from API
      const res = await fetch(`${SERVER_URL}/api/request-contact/owner/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch contact requests');

      const data = await res.json();
      setRequests(data); // Save requests in state
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to fetch contact requests');
    } finally {
      setLoading(false);
    }
  };

  // Fetch requests when component mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  /**
   * Accept a specific contact request
   */
  const handleAccept = async (requestId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await fetch(
        `${SERVER_URL}/api/request-contact/owner/requests/${requestId}/accept`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Failed to accept request');

      Alert.alert('Success', 'Request accepted');
      fetchRequests(); // Refresh requests list
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  /**
   * Reject a specific contact request
   */
  const handleReject = async (requestId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await fetch(
        `${SERVER_URL}/api/request-contact/owner/requests/${requestId}/reject`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error('Failed to reject request');

      Alert.alert('Success', 'Request rejected');
      fetchRequests(); // Refresh requests list
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  /**
   * Expand or collapse request details
   */
  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <LinearGradient colors={['#fdf2f8', '#eceffeff']} style={styles.gradient}>
        <ActivityIndicator size="large" style={styles.loading} />
      </LinearGradient>
    );
  }

  // Show empty state if no requests found
  if (requests.length === 0) {
    return (
      <LinearGradient colors={['#fdf2f8', '#eceffeff']} style={styles.gradient}>
        <Text style={styles.noRequests}>No contact requests received yet.</Text>
      </LinearGradient>
    );
  }

  // Render the requests list
  return (
    <LinearGradient colors={['#fdf2f8', '#eceffeff']} style={styles.gradient}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.request_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Request header */}
            <TouchableOpacity onPress={() => toggleExpand(item.request_id)}>
              <View style={styles.headerRow}>
                <Text style={styles.property}>{item.property_name}</Text>
                <Text
                  style={[
                    styles.status,
                    item.status?.toLowerCase() === 'accepted' && styles.acceptedStatus,
                  ]}
                >
                  {item.status ? item.status.toUpperCase() : 'PENDING'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Expanded details */}
            {expandedId === item.request_id && (
              <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Name: {item.requester_name}</Text>
                <Text style={styles.detailText}>Agency: {item.agency || 'N/A'}</Text>
                <Text style={styles.detailText}>
                  Phone: {item.contact_number || 'N/A'}
                </Text>
                <Text style={styles.detailText}>Email: {item.email}</Text>
                <Text style={styles.detailText}>
                  Message: {item.message || 'No message'}
                </Text>

                {/* If accepted, show owner's contact info */}
                {item.status?.toLowerCase() === 'accepted' ? (
                  <>
                    <Text style={[styles.detailText, { fontWeight: 'bold', marginTop: 6 }]}>
                      Owner Contact Info:
                    </Text>
                    <Text style={styles.detailText}>Name: {item.owner_name}</Text>
                    <Text style={styles.detailText}>Email: {item.owner_email}</Text>
                    <Text style={styles.detailText}>Phone: {item.owner_contact}</Text>
                  </>
                ) : (
                  // If pending, show Accept/Reject buttons
                  <View style={styles.buttonsContainer}>
                    <Pressable
                      style={[styles.button, styles.acceptButton]}
                      onPress={() => handleAccept(item.request_id)}
                    >
                      <Text style={[styles.buttonText, { color: '#166534' }]}>Accept</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.rejectButton]}
                      onPress={() => handleReject(item.request_id)}
                    >
                      <Text style={[styles.buttonText, { color: '#7f1d1d' }]}>Reject</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      />
    </LinearGradient>
  );
};

export default ViewRequests;