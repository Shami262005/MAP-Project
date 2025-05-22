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
    image,
    title,
    description,
    publishedAt = new Date().toISOString(),
  } = announcement;

  const formatted = new Date(publishedAt).toLocaleDateString('en-US', {
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
          {/* Back */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#22396D" />
          </TouchableOpacity>

          {/* Image */}
          <Image source={{ uri: image }} style={styles.image} />

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Description */}
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{description}</Text>

          {/* Published */}
          <Text style={styles.published}>Published: {formatted}</Text>

          {/* Delete */}
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              /* TODO: delete logic */
            }}
          >
            <Text style={styles.deleteText}>Delete Announcement</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  published: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
  },
  deleteBtn: {
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
