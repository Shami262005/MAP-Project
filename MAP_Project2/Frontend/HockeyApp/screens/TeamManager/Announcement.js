// screens/TeamManager/Announcement.js

import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listAnnouncements } from '../../src/api/announcments';

export default function Announcement({ navigation }) {
  const isFocused = useIsFocused();
  const [teamId, setTeamId]             = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  // reload on mount and every time screen gains focus
  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      const id = await AsyncStorage.getItem('team_id');
      if (id) setTeamId(Number(id));
      try {
        const all = await listAnnouncements();
        setAnnouncements(all);
      } catch (err) {
        console.error('Failed to load announcements', err);
      }
    })();
  }, [isFocused]);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['token','user_role','user_id','team_id']);
    navigation.replace('Login');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('AnnouncementDetails', { announcement: item })
      }
    >
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={styles.cardImage} />
      )}
      <Text style={styles.cardTitle}>{item.heading}</Text>
      <Text style={styles.cardDate}>
        {new Date(item.published_at).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>

        {/* Logo */}
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutBtn}
        >
          <Ionicons name="log-out-outline" size={28} color="#C21E24" />
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.header}>Latest Announcements</Text>

        {announcements.length === 0 ? (
          <Text style={styles.noText}>No announcements found.</Text>
        ) : (
          <FlatList
            data={announcements}
            keyExtractor={i => String(i.announcement_id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        )}

        {/* Bottom nav */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => teamId && navigation.navigate('Team', { teamId })}
          >
            <Ionicons name="people" size={24} color="#666" />
            <Text style={styles.navLabel}>Team</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="megaphone" size={24} color="#22396D" />
            <Text style={[styles.navLabel, { color: '#22396D' }]}>
              Announcements
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('EventsScreen')}
          >
            <MaterialIcons name="event" size={24} color="#666" />
            <Text style={styles.navLabel}>Events</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:    { flex: 1, backgroundColor: '#fff' },
  container:   { flex: 1, backgroundColor: '#fff', paddingBottom: 70 },
  logo:        {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 14,
  },
  logoutBtn:   {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 8 : 8,
    right: 16,
  },
  header:      {
    fontSize: 22,
    fontWeight: '700',
    color: '#22396D',
    marginHorizontal: 50,
    marginVertical: 10,
    textAlign: 'center',
  },
  noText:      {
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
    fontSize: 14,
  },
  listContent: { paddingBottom: 20 },
  card:        {
    backgroundColor: '#f9f9f9',
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 4,
  },
  cardImage:   {
    width: '100%',
    height: 180,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    resizeMode: 'cover',
  },
  cardTitle:   {
    fontSize: 18,
    fontWeight: '700',
    color: '#22396D',
    marginTop: 12,
  },
  cardDate:    {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  bottomNav:   {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    height: 60,
  },
  navItem:     { alignItems: 'center' },
  navLabel:    { fontSize: 12, color: '#666', marginTop: 2 },
});
