import React, { useState } from 'react';
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

const sampleEvents = [
  {
    id: '1',
    title: 'Training Session',
    date: new Date(2024, 4, 5),
    type: 'Practice',
    description: 'Strength and conditioning',
    venue: 'National Hockey Stadium',
    time: '4:00 PM',
    invites: ['Adam Scott', 'Erin Hughes', 'Keith Wright'],
  },
  {
    id: '2',
    title: 'League Match',
    date: new Date(2024, 4, 12),
    type: 'Match',
    description: 'Season opener',
    venue: 'City Arena',
    time: '7:00 PM',
    invites: ['Alice Johnson', 'Michael Brown'],
  },
  {
    id: '3',
    title: 'Practice Game',
    date: new Date(2024, 4, 20),
    type: 'Scrimmage',
    description: 'Inter-squad scrimmage',
    venue: 'East Rink',
    time: '5:30 PM',
    invites: ['Emily Davis', 'James Wilson'],
  },
];

export default function EventsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const filtered = sampleEvents.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (!filterDate) return true;
    return (
      e.date.getFullYear() === filterDate.getFullYear() &&
      e.date.getMonth() === filterDate.getMonth() &&
      e.date.getDate() === filterDate.getDate()
    );
  });

  const onChangeDate = (_, selected) => {
    setShowPicker(false);
    if (selected) setFilterDate(selected);
  };

  const renderEvent = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('EventDetails', { event: item })}
      style={styles.eventCard}
    >
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>
        {item.date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView
        style={[
          styles.safe,
          Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight },
        ]}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#22396D" />
          </TouchableOpacity>

          {/* Calendar Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={60} color="#22396D" />
          </View>

          {/* Title */}
          <Text style={styles.title}>Events</Text>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events"
              placeholderTextColor="#888"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Date Filter */}
          <TouchableOpacity style={styles.dateFilter} onPress={() => setShowPicker(true)}>
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

          {/* Events List */}
          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            renderItem={renderEvent}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {filterDate ? 'No events on this date.' : 'No events match your search.'}
              </Text>
            }
          />

          {/* Add Event Button */}
          <TouchableOpacity
            style={styles.addFloating}
            onPress={() => navigation.navigate('RegisterEvent')}
          >
            <Ionicons name="add" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.addLabel}>Add Event</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 40 },

  backBtn: { marginBottom: 10 },

  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
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
    elevation: 1,
  },
  eventTitle: { fontSize: 16, fontWeight: '600', color: '#22396D', marginBottom: 4 },
  eventDate: { fontSize: 14, color: '#555' },

  emptyText: { textAlign: 'center', marginTop: 40, color: '#888', fontSize: 14 },

  addFloating: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#22396D',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  addLabel: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    color: '#22396D',
    fontWeight: '600',
  },
});
