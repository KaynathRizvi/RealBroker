import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { jwtDecode } from 'jwt-decode'; // corrected import (default export)
import { LinearGradient} from "expo-linear-gradient" ;
import styles from '../styles/sentRequestStyles';

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
    return (
      <LinearGradient colors={["#fdf2f8", "#eceffeff"]} style={styles.gradient}>
        <ActivityIndicator size="large" style={styles.loading} />
      </LinearGradient>
    );
  }

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