import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, StyleSheet,
  Pressable, Alert, TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

interface DecodedToken {
  userId: number;
}

const Owner = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null); // For dropdown behavior

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const decoded: DecodedToken = jwtDecode(token);
      const userId = decoded.userId;

      const res = await fetch(`${SERVER_URL}/api/request-contact/owner/requests/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch contact requests');

      const data = await res.json();
      setRequests(data);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to fetch contact requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (requestId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await fetch(`${SERVER_URL}/api/request-contact/owner/requests/${requestId}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to accept request');

      Alert.alert('Success', 'Request accepted');
      fetchRequests(); // refresh to get updated status
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await fetch(`${SERVER_URL}/api/request-contact/owner/requests/${requestId}/reject`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to reject request');

      Alert.alert('Success', 'Request rejected');
      fetchRequests();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  }

  if (requests.length === 0) {
    return <Text style={{ padding: 20 }}>No contact requests yet.</Text>;
  }

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.request_id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity onPress={() => toggleExpand(item.request_id)}>
            <View style={styles.headerRow}>
              <Text style={styles.property}>{item.property_name}</Text>
              <Text style={styles.status}>Status: {item.status || 'pending'}</Text>
            </View>
          </TouchableOpacity>

          {expandedId === item.request_id && (
            <View style={{ marginTop: 10 }}>
              <Text>Name: {item.requester_name}</Text>
              <Text>Agency: {item.agency || 'N/A'}</Text>
              <Text>Phone: {item.contact_number || 'N/A'}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Message: {item.message || 'No message'}</Text>

              {item.status?.toLowerCase() === 'accepted' ? (
                <>
                  <Text style={{ fontWeight: 'bold', marginTop: 6 }}>Owner Contact Info:</Text>
                  <Text>Name: {item.owner_name}</Text>
                  <Text>Email: {item.owner_email}</Text>
                  <Text>Phone: {item.owner_contact}</Text>
                </>
              ) : (
                <View style={styles.buttonsContainer}>
                  <Pressable
                    style={[styles.button, styles.acceptButton]}
                    onPress={() => handleAccept(item.request_id)}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.rejectButton]}
                    onPress={() => handleReject(item.request_id)}
                  >
                    <Text style={styles.buttonText}>Reject</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  property: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    fontStyle: 'italic',
    color: '#555',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    width: 180,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Owner;
