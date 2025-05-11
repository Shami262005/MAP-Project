import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, FlatList, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const announcements = [
  {
    id: '1',
    title: 'Important Update',
    date: 'Apr 20, 2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: require('../../assets/logo.png'),
  },
  {
    id: '2',
    title: 'Upcoming Meeting',
    date: 'Apr 18, 2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: require('../../assets/logo.png'),
  },
  {
    id: '3',
    title: 'Event Announcement',
    date: 'Apr 10, 2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: require('../../assets/logo.png'),
  },
];

export default function Announcement({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Announcements</Text>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textBox}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text numberOfLines={1} style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Team')} style={styles.navItem}>
          <Ionicons name="people" size={24} color="#666" />
          <Text style={styles.navLabel}>Team</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="megaphone" size={24} color="#22396D" />
          <Text style={[styles.navLabel, { color: '#22396D' }]}>Announcements</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Events')} style={styles.navItem}>
          <MaterialIcons name="event" size={24} color="#666" />
          <Text style={styles.navLabel}>Events</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  logo: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e3b74',
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  image: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  textBox: { flex: 1 },
  cardTitle: { fontWeight: 'bold', color: '#1e3b74' },
  date: { fontSize: 12, color: '#666' },
  description: { fontSize: 12, color: '#333' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 12, color: '#666', marginTop: 2 },
});
