import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function AdminDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo1.png')} // replace with admin logo if needed
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.grid}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Teams')}>
  <FontAwesome5 name="users" size={40} color="#22396D" />
  <Text style={styles.label}>Teams</Text>
</TouchableOpacity>


        <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate('Events')} >
          <Ionicons name="calendar" size={40} color="#22396D" />
          <Text style={styles.label}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Announcements')}>
          <Ionicons name="megaphone" size={40} color="#22396D" />
          <Text style={styles.label}>Announcements</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={40} color="#22396D" />
          <Text style={styles.label}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.logoutButton}
  onPress={() => navigation.replace('Login')} // or navigate to a landing screen
>
  <Ionicons name="log-out-outline" size={28} color="#C21E24" />
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, backgroundColor: '#fff' },
  logo: { width: 120, height: 120, marginBottom: 10 },
  title: { fontSize: 30, fontWeight: '700', color: '#22396D', marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20 },
  card: {
    width: 150,
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    elevation: 3,
  },
  label: { marginTop: 10, fontSize: 15, fontWeight: '600', color: '#22396D' },
  logoutButton: {
    position: 'absolute',
    bottom:-180 ,
    right: 20,
    alignItems: 'center',
  },
  logoutText: {
    color: '#C21E24',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  
});
