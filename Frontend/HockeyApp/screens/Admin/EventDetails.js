// screens/Admin/EventDetailsScreen.js

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventDetailsScreen({ navigation, route }) {
  // Pull event data (and invites) from params
  const {
    title = 'Training Session',
    type = 'Practice',
    description = 'Strength and conditioning',
    venue = 'National Hockey Stadium',
    date = new Date().toISOString(),
    time = '4:00 PM',
    invites = ['Adam Scott', 'Erin Hughes', 'Keith Wright'],
  } = route.params?.event || {};

  // Format date nicely
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#22396D" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Event Details</Text>
            <TouchableOpacity onPress={() => {/* TODO: navigate to edit screen */}}>
              <Ionicons name="pencil" size={24} color="#22396D" />
            </TouchableOpacity>
          </View>

          {/* Event Info */}
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{title}</Text>

          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{type}</Text>

          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{description}</Text>

          <Text style={styles.label}>Venue</Text>
          <Text style={styles.value}>{venue}</Text>

          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{formattedDate}</Text>

          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{time}</Text>

          {/* Invites */}
          <Text style={styles.sectionTitle}>Invited</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsContainer}
          >
            {invites.map((name) => (
              <View key={name} style={styles.chip}>
                <Text style={styles.chipText}>{name}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Delete Button */}
          <TouchableOpacity style={styles.deleteButton} onPress={() => {/* TODO: handle delete */}}>
            <Text style={styles.deleteButtonText}>Delete Event</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#22396D',
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    color: '#888',
    marginTop: 15,
  },
  value: {
    fontSize: 16,
    color: '#22396D',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22396D',
    marginTop: 25,
    marginBottom: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  chip: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: 14,
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
