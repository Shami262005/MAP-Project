// screens/Admin/ManageEvents.js

import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';
import { listEvents } from '../../src/api/events';

export default function EventsScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [events, setEvents] = useState([]);

  const fetchEvents = useCallback(async () => {
    try {
      const data = await listEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to load events', err);
    }
  }, []);

  useEffect(() => {
    if (isFocused) fetchEvents();
  }, [isFocused, fetchEvents]);

  const filtered = events.filter(e => {
    const titleMatch = e.event_name
      .toLowerCase()
      .includes(search.toLowerCase());
    if (!titleMatch) return false;
    if (!filterDate) return true;
    const evDate = new Date(e.date);
    return (
      evDate.getFullYear() === filterDate.getFullYear() &&
      evDate.getMonth() === filterDate.getMonth() &&
      evDate.getDate() === filterDate.getDate()
    );
  });

  const onChangeDate = (_, selected) => {
    setShowPicker(false);
    if (selected) setFilterDate(selected);
  };

  const renderEvent = ({ item }) => {
    const evDate = new Date(item.date);
    const formatted = evDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() =>
          navigation.navigate('EventDetails', { event: item })
        }
      >
        <Text style={styles.eventTitle}>{item.event_name}</Text>
        <Text style={styles.eventDate}>{formatted}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.safe,
        Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight },
      ]}
      edges={['top', 'bottom']}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#22396D" />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <Ionicons name="calendar" size={60} color="#22396D" />
        </View>

        <Text style={styles.title}>Events</Text>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={18}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.dateFilter}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateText}>
            {filterDate
              ? filterDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Filter by date'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#22396D" />
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={filterDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={onChangeDate}
          />
        )}

        <FlatList
          data={filtered}
          keyExtractor={item => String(item.event_id)}
          renderItem={renderEvent}
          contentContainerStyle={{ paddingBottom: 180 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {filterDate
                ? 'No events on this date.'
                : 'No events match your search.'}
            </Text>
          }
        />
      </ScrollView>

      <TouchableOpacity
        style={[styles.addFloating, { bottom: 100, alignSelf: 'center' }]}
        onPress={() => navigation.navigate('RegisterEvent')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
      <Text style={[styles.addLabel, { bottom: 85, alignSelf: 'center' }]}>
        Add Event
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 0 },
  backBtn: { marginBottom: 10 },
  iconContainer: { alignItems: 'center', marginBottom: 10 },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#22396D',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },
  dateFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  dateText: { flex: 1, fontSize: 16, color: '#888' },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22396D',
    marginBottom: 4,
  },
  eventDate: { fontSize: 14, color: '#555' },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
    fontSize: 14,
  },
  addFloating: {
    position: 'absolute',
    backgroundColor: '#22396D',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10,
    elevation: 4,
  },
  addLabel: {
    position: 'absolute',
    color: '#22396D',
    fontWeight: '600',
  
  },
});
