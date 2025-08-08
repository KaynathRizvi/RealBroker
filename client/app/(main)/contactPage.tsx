import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/contactPageStyles';  // adjust path if needed

export default function ContactPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact RealBroker</Text>

      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Website:</Text>
          <Text style={styles.value}>RealBroker</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>1234 Main Street, Suite 500, YourCity, YourState, 12345</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>+1 (555) 123-4567</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>contact@realbroker.com</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Working Hours:</Text>
          <Text style={styles.value}>Mon - Fri, 9:00 AM - 6:00 PM</Text>
        </View>
      </View>
    </ScrollView>
  );
}
