// screens/TeamManager/EventsScreen.js

import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listInvitedEvents } from '../../src/api/events';
import { useIsFocused } from '@react-navigation/native';

export default function EventsScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [teamId, setTeamId] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      setLoading(true);
      const id = await AsyncStorage.getItem('team_id');
      if (id) setTeamId(Number(id));
      try {
        const evs = await listInvitedEvents();
        setEvents(evs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22396D" />
      </View>
    );
  }

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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
      >
        <View style={styles.container}>
          

          <Text style={styles.header}>Upcoming Events</Text>

          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={18} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events"
              placeholderTextColor="#888"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <FlatList
            data={filtered}
            keyExtractor={item => String(item.event_id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </KeyboardAvoidingView>

      {!keyboardVisible && (
        <SafeAreaView edges={['bottom']} style={styles.navSafe}>
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => teamId && navigation.navigate('Team', { teamId })}
            >
              <Ionicons name="people" size={24} color="#666" />
              <Text style={styles.navLabel}>Team</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('AnnouncementScreen')}
            >
              <Ionicons name="megaphone" size={24} color="#666" />
              <Text style={styles.navLabel}>Announcements</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <MaterialIcons name="event" size={24} color="#22396D" />
              <Text style={[styles.navLabel, { color: '#22396D' }]}>Events</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:    { flex: 1, backgroundColor: '#fff' },
  navSafe:     { backgroundColor: '#fff' },
  flex:        { flex: 1 },
  container:   { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  backButton:  { position: 'absolute', top: 16, left: 16, zIndex: 1 },
  header:      { textAlign: 'center', fontSize: 22, fontWeight: '700', color: '#22396D', marginVertical: 10 },
  searchWrapper:{
    flexDirection:'row', alignItems:'center',
    backgroundColor:'#F5F5F5',
    marginHorizontal:20, borderRadius:8,
    paddingHorizontal:10, paddingVertical:8,
    marginBottom:10
  },
  searchInput:   { flex:1, marginLeft:8, color:'#000' },
  listContent:   { paddingBottom:10 },
  eventCard:     {
    backgroundColor:'#fff',
    marginHorizontal:20, marginVertical:6,
    padding:15, borderRadius:10, elevation:4,
    shadowColor:'#000', shadowOffset:{width:0,height:2},
    shadowOpacity:0.1, shadowRadius:4
  },
  eventName:     { fontSize:16, fontWeight:'700', color:'#22396D' },
  eventDate:     { fontSize:14, color:'#555', marginTop:4 },
  centered:      { flex:1, justifyContent:'center', alignItems:'center' },
  bottomNav:     {
    flexDirection:'row', justifyContent:'space-around', alignItems:'center',
    height:60
  },
  navItem:      { alignItems:'center' },
  navLabel:     { fontSize:12, color:'#666', marginTop:2 },
});
