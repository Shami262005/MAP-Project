// Team.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const players = [
  { id: '1', name: 'Sarah Martinez', image: require('../../assets/logo.png') },
  { id: '2', name: 'John Doe',         image: require('../../assets/logo.png') },
];

export default function Team({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1e3b74" />
        </TouchableOpacity>
        <Text style={styles.header}>Team</Text>
        <FlatList
          data={players}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.playerCard}>
              <Image source={item.image} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('RemovePlayer', { player: item })}>
                <Ionicons name="eye" size={20} color="#1e3b74" />
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPlayer')}>
          <Text style={styles.addText}>Add Player</Text>
        </TouchableOpacity>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="people" size={24} color="red" />
            <Text style={[styles.navLabel, { color: 'red' }]}>Team</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Announcement')} style={styles.navItem}>
            <Ionicons name="megaphone" size={24} color="#666" />
            <Text style={styles.navLabel}>Announcements</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EventsScreen')} style={styles.navItem}>
            <MaterialIcons name="event" size={24} color="#666" />
            <Text style={styles.navLabel}>Events</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:   { flex: 1, backgroundColor: '#fff' },
  container:  { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 1 },
  header:     { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#1e3b74', marginBottom: 10 },
  playerCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, marginVertical: 10, padding: 15,
    backgroundColor: '#fff', borderRadius: 10,
    justifyContent: 'space-between', borderWidth: 1, borderColor: '#ddd'
  },
  avatar:     { width: 40, height: 40, borderRadius: 20 },
  name:       { fontSize: 16, color: '#1e3b74', flex: 1, marginLeft: 10 },
  addButton:  { backgroundColor: '#1e3b74', padding: 12, borderRadius: 10, marginHorizontal: 20, alignItems: 'center', marginTop: 20 },
  addText:    { color: '#fff', fontSize: 16 },
  bottomNav:  {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: '#fff', paddingVertical: 10, borderTopColor: '#ddd', borderTopWidth: 1
  },
  navItem:    { alignItems: 'center' },
  navLabel:   { fontSize: 12, color: '#666', marginTop: 2 }
});