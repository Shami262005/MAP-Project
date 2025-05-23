// screens/TeamManager/EventDetailsScreen.js

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getEvent } from '../../src/api/events';

export default function EventDetailsScreen({ navigation, route }) {
  // 1) If the navigator passed you the full event object, use that...
  const passed = route.params?.event;
  // 2) ...otherwise grab an ID
  const eventId = passed?.event_id ?? route.params?.eventId;

  const [event, setEvent]     = useState(passed || null);
  const [loading, setLoading] = useState(!passed);

  useEffect(() => {
    if (passed) return;       // already have it
    if (!eventId) return setLoading(false);

    (async () => {
      try {
        const data = await getEvent(eventId);
        setEvent(data);
      } catch (err) {
        console.error('Failed to load event details', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [passed, eventId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22396D" />
      </View>
    );
  }

  const {
    event_name: title = '',
    type = '',
    description = '',
    venue = '',
    date = '',
    // now matching the backend alias
    invitees = [],
  } = event || {};

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const formattedTime = date
    ? new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

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
            {/* no edit icon for manager */}
            <View style={{ width: 24 }} />
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
          <Text style={styles.value}>{formattedTime}</Text>

          {/* Invited */}
          <Text style={styles.sectionTitle}>Invited</Text>
          {invitees.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsContainer}
            >
              {invitees.map(inv => (
                <View key={inv.user_id} style={styles.chip}>
                  <Text style={styles.chipText}>
                    {inv.first_name} {inv.last_name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.value}>No one invited yet.</Text>
          )}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingLeft: 0,
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
});
