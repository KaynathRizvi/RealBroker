import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable, Alert } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'; // fixed import syntax

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

interface DecodedToken {
  userId: number;
}

const Owner = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      const decoded: DecodedToken = jwtDecode(token);
      const userId = decoded.userId;

      if (!userId) {
        console.error('User ID not found in token');
        setLoading(false);
        return;
      }

      const res = await fetch(`${SERVER_URL}/api/request-contact/owner/requests/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to fetch contact requests');
      }

      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error('Failed to fetch contact requests:', err);
      Alert.alert('Error', 'Failed to fetch contact requests');
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

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to accept request');
      }

      Alert.alert('Success', 'Request accepted');

      // Optimistically update the accepted request status in state
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.request_id === requestId ? { ...req, status: 'accepted' } : req
        )
      );
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to reject request');
      }

      Alert.alert('Success', 'Request rejected and deleted');
      fetchRequests(); // refresh list after reject
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
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
          <Text style={styles.property}>Property: {item.property_name}</Text>
          <Text>Name: {item.requester_name}</Text>
          <Text>Agency: {item.agency || 'N/A'}</Text>
          <Text>Phone: {item.contact_number || 'N/A'}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Message: {item.message || 'No message'}</Text>
          <Text>Status: {item.status}</Text>

          {item.status === 'accepted' && (
            <>
              <Text style={{ fontWeight: 'bold', marginTop: 6 }}>Owner Contact Info:</Text>
              <Text>Name: {item.owner_name}</Text>
              <Text>Email: {item.owner_email}</Text>
              <Text>Phone: {item.owner_contact}</Text>
            </>
          )}

          {item.status !== 'accepted' && (
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
  property: {
    fontWeight: 'bold',
    marginBottom: 4,
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
