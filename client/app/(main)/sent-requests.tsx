import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { jwtDecode } from 'jwt-decode';

const SERVER_URL =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

interface DecodedToken {
  userId: number;
}

const SentRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchSentRequests = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token');

      const decoded: DecodedToken = jwtDecode(token);
      const userId = decoded.userId;

      const res = await fetch(`${SERVER_URL}/api/request-contact/sent-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setRequests(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    fetchSentRequests();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (requests.length === 0) {
    return <Text style={{ padding: 20 }}>You haven't sent any contact requests.</Text>;
  }

  return (
    <FlatList
      data={requests}
      keyExtractor={(item, index) =>
        item.request_id ? item.request_id.toString() : index.toString()
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity onPress={() => toggleExpand(item.request_id)}>
            <View style={styles.headerRow}>
              <Text style={styles.property}>{item.property_name}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
            </View>
          </TouchableOpacity>

          {expandedId === item.request_id && (
            <View style={{ marginTop: 10 }}>
              {item.status === 'accepted' ? (
                <>
                  <Text>Message: Hello, let's connect!</Text>
                  <Text>Owner Name: {item.owner_name}</Text>
                  <Text>Email: {item.owner_email}</Text>
                  <Text>Contact: {item.owner_contact}</Text>
                </>
              ) : (
                <Text>You will see owner details once the request is accepted.</Text>
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
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    margin: 10,
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
});

export default SentRequests;
