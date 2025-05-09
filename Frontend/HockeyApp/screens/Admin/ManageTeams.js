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
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const sampleTeams = [
  { id: '1', name: 'Cougars', icon: <Ionicons name="paw" size={24} color="#fff" /> },
  { id: '2', name: 'Mustangs', icon: <FontAwesome5 name="horse-head" size={22} color="#fff" /> },
  { id: '3', name: 'Lions', icon: <MaterialCommunityIcons name="lion" size={26} color="#fff" /> },
  { id: '4', name: 'Thunderbirds', icon: <MaterialCommunityIcons name="twitter" size={24} color="#fff" /> },
];

export default function TeamsScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const filteredTeams = sampleTeams.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderTeam = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.teamItem}
      onPress={() =>
        navigation.navigate('TeamDetails', {
          teamName: item.name,
          manager: item.manager,
          players: item.players,
        })
      }
    >
      <View style={styles.iconWrapper}>{item.icon}</View>
      <Text style={styles.teamName}>{item.name}</Text>
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#22396D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Teams</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for team"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Count */}
        <Text style={styles.countText}>{filteredTeams.length} teams</Text>

        {/* List */}
        <FlatList
          data={filteredTeams}
          keyExtractor={item => item.id}
          renderItem={renderTeam}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Add Button */}
        <TouchableOpacity
          style={styles.addFloating}
          onPress={() => navigation.navigate('RegisterTeam')}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.addLabel}>Add Team</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#22396D' },
  headerRightPlaceholder: { width: 24 }, // to center title
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 20,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },
  countText: {
    marginHorizontal: 20,
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    marginBottom: 10,
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22396D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  teamName: { fontSize: 16, fontWeight: '600', color: '#22396D' },
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
    bottom: -5,
    alignSelf: 'center',
    marginTop: 70,
    marginBottom:20,
    color: '#22396D',
    fontWeight: '600',
  },
});
