// screens/EventDetails.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Platform,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getEventById } from '../../src/api/events';

export default function EventDetails({ navigation, route }) {
  const passed   = route.params?.event;
  const eventId  = passed?.event_id ?? route.params?.eventId;
  const [event, setEvent]     = useState(passed || null);
  const [loading, setLoading] = useState(!passed);

  useEffect(() => {
    if (passed) return;
    if (!eventId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const data = await getEventById(eventId);
        setEvent(data);
      } catch (err) {
        console.error('Failed to load event details', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [passed, eventId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22396D" />
      </View>
    );
  }

  const {
    event_name: title = '',
    type = '',
    description = '',
    venue = '',
    date = '',
    invitees = []
  } = event || {};

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        month:'long', day:'numeric', year:'numeric'
      })
    : '';
  const formattedTime = date
    ? new Date(date).toLocaleTimeString('en-US', {
        hour:'2-digit', minute:'2-digit'
      })
    : '';

  return (
    <SafeAreaView
      style={[styles.safe, Platform.OS==='android' && { paddingTop:StatusBar.currentHeight }]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#22396D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Event Details</Text>
          <View style={{ width: 24 }} />
        </View>

        {[
          ['Title', title],
          ['Type', type],
          ['Description', description],
          ['Venue', venue],
          ['Date', formattedDate],
          ['Time', formattedTime]
        ].map(([label, value]) => (
          <View key={label} style={{ marginTop: 15 }}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}

        <Text style={[styles.label, { marginTop: 25 }]}>Invited</Text>
        {invitees.length ? (
          invitees.map(u => (
            <View key={u.user_id} style={styles.chip}>
              <Text style={styles.chipText}>
                {u.first_name} {u.last_name}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.value}>No one invited yet.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:        { flex:1, backgroundColor:'#fff' },
  container:   { padding:20, paddingBottom:40 },
  header:      { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20 },
  headerTitle: { fontSize:20,fontWeight:'700',color:'#22396D' },
  label:       { fontSize:15,fontWeight:'400',color:'#888' },
  value:       { fontSize:16,color:'#22396D',marginTop:4 },
  chip:        {
    backgroundColor:'#E0E0E0',
    paddingHorizontal:12,
    paddingVertical:6,
    borderRadius:20,
    marginTop:8
  },
  chipText:    { fontSize:14,color:'#000' },
  centered:    { flex:1,justifyContent:'center',alignItems:'center' }
});
