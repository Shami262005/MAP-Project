// screens/TeamManager/AnnouncementDetailsScreen.js

import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AnnouncementDetailsScreen({ navigation, route }) {
  const { announcement } = route.params;
  const {
    image_url,
    heading,
    description,
    published_at = new Date().toISOString(),
  } = announcement;

  const formatted = new Date(published_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView
        style={[
          styles.safe,
          Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight },
        ]}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Back button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#22396D" />
          </TouchableOpacity>

          {/* Announcement image */}
          <Image source={{ uri: image_url }} style={styles.image} />

          {/* Title */}
          <Text style={styles.title}>{heading}</Text>

          {/* Published date */}
          <Text style={styles.published}>Published: {formatted}</Text>

          {/* Description */}
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{description}</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 40 },
  backBtn: { marginBottom: 10 },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22396D',
    marginBottom: 12,
  },
  published: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
