import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const team = {
  name: 'Wildcats',
  manager: 'John Smith',
  players: [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Michael Brown' },
    { id: '3', name: 'Emily Davis' },
    { id: '4', name: 'James Wilson' },
  ],
};

export default function TeamDetailsScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const filteredPlayers = team.players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderPlayer = ({ item }) => (
    <View style={styles.playerItem}>
      <View style={styles.playerIcon}>
        <FontAwesome name="user" size={20} color="#fff" />
      </View>
      <Text style={styles.playerName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#22396D" />
      </TouchableOpacity>

      {/* Team Logo Circle */}
      <View style={styles.logoCircle}>
        <FontAwesome name="users" size={40} color="#fff" />
      </View>

      {/* Team Name and Manager */}
      <Text style={styles.teamName}>{team.name}</Text>
      <Text style={styles.roleLabel}>Team Manager</Text>
      <Text style={styles.managerName}>{team.manager}</Text>

      {/* Player Section Header */}
      <View style={styles.playersHeader}>
        <Text style={styles.playersTitle}>Players</Text>
        <Text style={styles.playersCount}>{team.players.length}</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search player"
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      {/* Player List */}
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id}
        renderItem={renderPlayer}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 40 },
  backBtn: { marginBottom: 10 },
  logoCircle: {
    backgroundColor: '#22396D',
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  teamName: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#22396D',
  },
  roleLabel: {
    textAlign: 'center',
    color: '#888',
    marginTop: 4,
    fontWeight: '500',
  },
  managerName: {
    textAlign: 'center',
    color: '#22396D',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 20,
  },
  playersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  playersTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22396D',
  },
  playersCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22396D',
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#000',
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playerIcon: {
    backgroundColor: '#22396D',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  playerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22396D',
  },
});
