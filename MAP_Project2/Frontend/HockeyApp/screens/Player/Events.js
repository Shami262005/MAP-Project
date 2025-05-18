import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listInvitedEvents } from '../../src/api/events';

export default function EventsScreen({ navigation }) {
  const [teamId, setTeamId]     = useState(null);
  const [events, setEvents]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');

  useEffect(() => {
    (async () => {
      // get team_id for nav
      const id = await AsyncStorage.getItem('team_id');
      if (id) setTeamId(Number(id));

      // fetch invited events
      try {
        const evs = await listInvitedEvents();
        setEvents(evs);
      } catch (err) {
        console.error('Failed to load invited events', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = events.filter(e =>
    e.event_name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.event_id })}
    >
      <Text style={styles.eventName}>{item.event_name}</Text>
      <Text style={styles.eventDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22396D" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#22396D" />
        </TouchableOpacity>
        <Text style={styles.header}>Upcoming Events</Text>

        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Events..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={item => String(item.event_id)}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>No upcoming events found.</Text>
          }
          contentContainerStyle={{ paddingBottom: 80 }}
        />

        {/* Bottom nav */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            onPress={() => teamId && navigation.navigate('Team', { teamId })}
            style={styles.navItem}
          >
            <Ionicons name="people" size={24} color="#666" />
            <Text style={styles.navLabel}>Team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AnnouncementScreen')}
            style={styles.navItem}
          >
            <Ionicons name="megaphone" size={24} color="#666" />
            <Text style={styles.navLabel}>Announcements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="event" size={24} color="red" />
            <Text style={[styles.navLabel, { color: 'red' }]}>Events</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:    { flex: 1, backgroundColor: '#fff' },
  container:   { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  backButton:  { position: 'absolute', top: 40, left: 20, zIndex: 1 },
  header:      { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#22396D', marginVertical: 10 },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  searchInput: { flex: 1, paddingVertical: 8, color: '#000', marginLeft: 8 },
  eventCard:   {
    backgroundColor: '#f1f5f9',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  },
  eventName:   { fontSize: 16, fontWeight: 'bold', color: '#22396D' },
  eventDate:   { fontSize: 14, color: '#555', marginTop: 4 },
  empty:       { textAlign: 'center', color: '#888', marginTop: 40 },
  centered:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bottomNav:   {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  navItem:     { alignItems: 'center' },
  navLabel:    { fontSize: 12, color: '#666', marginTop: 2 },
});
