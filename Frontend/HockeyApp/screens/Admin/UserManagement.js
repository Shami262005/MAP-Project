// screens/Admin/UserManagementScreen.js

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const sampleUsers = [
  { id: '1', name: 'John Doe',    email: 'johndoe@example.com'    },
  { id: '2', name: 'Jane Smith',  email: 'janesmith@example.com'  },
  { id: '3', name: 'Bob Johnson', email: 'bobjohnson@example.com' },
  { id: '4', name: 'Alice Williams', email: 'alicewilliams@example.com' },
  { id: '5', name: 'Charlie Brown', email: 'charliebrown@example.com' },
];

export default function UserManagementScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const filtered = sampleUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor="#E5E9F4"
      style={styles.cardWrapper}
      onPress={() => {}}
    >
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => {/* TODO: delete action */}}>
            <Ionicons name="trash" size={22} color="#D32F2F" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* TODO: view action */}} style={styles.eyeBtn}>
            <Ionicons name="eye" size={22} color="#22396D" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );

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
        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#22396D" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.heading}>User Management</Text>

        {/* Search Bar */}
        <View style={styles.search}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* User List */}
        <FlatList
          data={filtered}
          keyExtractor={u => u.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.empty}>No users found.</Text>}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  backBtn: { marginTop: 10, marginLeft: 16, marginBottom: 8, width: 32 },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#22396D',
    marginBottom: 24,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: { marginLeft: 8, flex: 1, fontSize: 16, color: '#000' },
  cardWrapper: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  info: { flex: 1 },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22396D',
  },
  email: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: { marginLeft: 12 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
});
