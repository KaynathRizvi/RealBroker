import React from 'react';
import { Text, ScrollView } from 'react-native';
import styles from '../styles/aboutStyles';

export default function AboutPage() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.paragraph}>
        Welcome to our Real Estate App! We aim to simplify property buying, selling,
        and renting with a seamless digital experience.
      </Text>
      <Text style={styles.paragraph}>
        This app enables agents and users to manage their properties, communicate,
        and get up-to-date listings in one place.
      </Text>
      <Text style={styles.paragraph}>
        Built using modern technologies like React Native and Node.js, this app is optimized
        for speed, usability, and reliability.
      </Text>
      <Text style={styles.footer}>© 2025 Real Estate App</Text>
    </ScrollView>
  );
}
