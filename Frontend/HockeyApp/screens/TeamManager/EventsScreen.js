import React from 'react';
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
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const events = [
  { id: '1', name: 'Falcons vs Hawks', date: 'May 20, 2025' },
  { id: '2', name: 'Training Camp',    date: 'May 25, 2025' },
];

export default function EventsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1e3b74" />
        </TouchableOpacity>
        <Text style={styles.header}>Upcoming Events</Text>
        <TextInput style={styles.searchInput} placeholder="Search Events..." />
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Text style={styles.eventName}>{item.name}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
            </View>
          )}
        />

        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('Team')} style={styles.navItem}>
            <Ionicons name="people" size={24} color="#666" />
            <Text style={styles.navLabel}>Team</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Announcement')} style={styles.navItem}>
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
  header:      { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#1e3b74', marginVertical: 10 },
  searchInput: { backgroundColor: '#fff', marginHorizontal: 20, padding: 10, borderRadius: 8, borderColor: '#ccc', borderWidth: 1, marginBottom: 10 },
  eventCard:   { backgroundColor: '#f1f5f9', marginHorizontal: 20, marginBottom: 15, padding: 15, borderRadius: 10 },
  eventName:   { fontSize: 16, fontWeight: 'bold', color: '#1e3b74' },
  eventDate:   { fontSize: 14, color: '#555' },
  bottomNav:   {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: '#fff', paddingVertical: 10, borderTopColor: '#ddd', borderTopWidth: 1
  },
  navItem:     { alignItems: 'center' },
  navLabel:    { fontSize: 12, color: '#666', marginTop: 2 }
});