import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome  } from '@expo/vector-icons';

export default function RemovePlayer({ navigation }) {
  const player = { name: 'Sarah Martinez', gender: 'Female', email: 'sarahm@example.com', image: require('../../assets/logo.png') };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1e3b74" />
        </TouchableOpacity>
        <Image source={player.image} style={styles.profileImage} />
        <Text style={styles.name}>{player.name}</Text>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{player.gender}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{player.email}</Text>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.removeText}>Remove Player</Text>
        </TouchableOpacity>

        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:     { flex: 1, backgroundColor: '#fff' },
  container:    { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  backButton:   { position: 'absolute', top: 40, left: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  name:         { fontSize: 22, fontWeight: 'bold', color: '#1e3b74', marginBottom: 20 },
  infoBox:      { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 10 },
  label:        { fontSize: 16, color: '#555', fontWeight: 'bold' },
  value:        { fontSize: 16, color: '#333' },
  removeButton: { backgroundColor: '#c0392b', padding: 14, borderRadius: 10, marginTop: 40, width: '100%', alignItems: 'center' },
  removeText:   { color: '#fff', fontSize: 16 },
  bottomNav:    {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: '#fff', paddingVertical: 10, borderTopColor: '#ddd', borderTopWidth: 1
  },
  navItem:      { alignItems: 'center' },
  navLabel:     { fontSize: 12, color: '#666', marginTop: 2 }
});