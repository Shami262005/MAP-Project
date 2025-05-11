// Events.js
import React, { useState } from 'react';
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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const events = [
  { id: '1', name: 'Training Session', date: 'May 5, 2024', time: '15:00' },
  { id: '2', name: 'League Match',    date: 'May 12, 2024', time: '13:00' },
  { id: '3', name: 'Practice Game',    date: 'May 20, 2024', time: '16:00' },
];

export default function Events({ navigation }) {
  const [filter, setFilter] = useState('none');
  const [search, setSearch] = useState('');

  const filteredEvents = events.filter(e => {
    if (filter === 'none') return true;
    return e.date.includes(filter) || e.time.includes(filter);
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />

      <Text style={styles.header}>Events</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search events"
        value={search}
        onChangeText={setSearch}
      />

      <Picker
        selectedValue={filter}
        onValueChange={setFilter}
        style={styles.picker}
      >
        <Picker.Item label="No Filter" value="none" />
        <Picker.Item label="Filter by Date (May 5)" value="May 5" />
        <Picker.Item label="Filter by Time (15:00)" value="15:00" />
      </Picker>

      <FlatList
        data={filteredEvents.filter(e =>
          e.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDate}>
              {item.date} at {item.time}
            </Text>
          </View>
        )}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Team')}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:    { flex: 1, backgroundColor: '#fff' },
  header:      { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#1e3b74' },
  searchInput: { backgroundColor: '#fff', padding: 10, borderRadius: 8, borderColor: '#ccc', borderWidth: 1, marginHorizontal: 20, marginBottom: 10 },
  picker:      { height: 50, marginHorizontal: 20, marginBottom: 15 },
  card:        { backgroundColor: '#f0f4f8', marginHorizontal: 20, marginBottom: 10, padding: 15, borderRadius: 10 },
  eventName:   { fontSize: 16, fontWeight: 'bold', color: '#1e3b74' },
  eventDate:   { fontSize: 14, color: '#555' },
  bottomNav:   {
    flexDirection: 'row',
    justifyContent:   'space-around',
    alignItems:      'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopColor:  '#ddd',
    borderTopWidth:  1,
  },
  navItem:     { alignItems: 'center' },
  navLabel:    { fontSize: 12, color: '#666', marginTop: 2 },
});

