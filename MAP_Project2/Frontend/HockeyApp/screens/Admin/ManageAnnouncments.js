// screens/Admin/ManageAnnouncments.js

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listAnnouncements } from '../../src/api/announcments';

export default function AnnouncementsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await listAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error('Error loading announcements', err);
      }
    })();
  }, []);

  // filter by title
  const filtered = announcements.filter(a =>
    a.heading.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const date = new Date(item.published_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return (
      <TouchableHighlight
        underlayColor="#E5E9F4"
        style={styles.cardWrapper}
        onPress={() =>
          navigation.navigate('AnnouncementDetails', { announcement: item })
        }
      >
        <View style={styles.card}>
          <Image source={{ uri: item.image_url }} style={styles.thumb} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.heading}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

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
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#22396D" />
          </TouchableHighlight>

          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="megaphone" size={48} color="#22396D" />
            <Text style={styles.headerTitle}>Announcements</Text>
          </View>

          {/* Search */}
          <View style={styles.search}>
            <Ionicons name="search" size={18} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search announcements"
              placeholderTextColor="#888"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* List */}
          <FlatList
            data={filtered}
            keyExtractor={item => item.announcement_id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.empty}>No announcements found.</Text>
            }
          />

          </ScrollView>
          {/* Add Button */}
          <TouchableHighlight
            underlayColor="#1b2f68"
            style={styles.fab}
            onPress={() => navigation.navigate('AddAnnouncement')}
          >
            <Ionicons name="add" size={28} color="#fff" />
          </TouchableHighlight>
          <Text style={styles.fabLabel}>Add</Text>
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 40 },

  backBtn: { marginBottom: 10, alignSelf: 'flex-start' },

  header: { alignItems: 'center', marginBottom: 20 },
  headerTitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#22396D',
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: { marginLeft: 8, flex: 1, fontSize: 16, color: '#000' },

  cardWrapper: {
    borderRadius: 12,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  info: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22396D',
    marginBottom: 4,
  },
  date: { fontSize: 14, color: '#555' },

  empty: { textAlign: 'center', color: '#888', marginTop: 40 },

  fab: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: '#22396D',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabLabel: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    marginBottom: -10,
    color: '#22396D',
    fontWeight: '600',
  },
});
