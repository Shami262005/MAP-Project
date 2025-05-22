// screens/TeamManager/Team.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { getTeamDetails } from '../../src/api/teams';

export default function Team({ navigation, route }) {
  const teamId = route.params?.teamId;

  const [team, setTeam]         = useState(null);
  const [coach, setCoach]       = useState(null);
  const [players, setPlayers]   = useState([]);
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!teamId) return;
    (async () => {
      try {
        const { team: t, coach: c, players: p } = await getTeamDetails(teamId);
        setTeam(t);
        setCoach(c);
        setPlayers(p);
      } catch (err) {
        console.error('Failed to load team details', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [teamId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22396D" />
      </View>
    );
  }

  const filtered = players.filter(u =>
    (`${u.first_name} ${u.last_name}`)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const renderPlayer = ({ item }) => (
    <TouchableOpacity
      style={styles.playerCard}
     
    >
      <View style={styles.playerIcon}>
        <FontAwesome name="user" size={20} color="#fff" />
      </View>
      <Text style={styles.playerName}>
        {item.first_name} {item.last_name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#22396D" />
          </TouchableOpacity>

          {/* Logo */}
          {team.logo_url ? (
            <Image source={{ uri: team.logo_url }} style={styles.teamLogo} />
          ) : (
            <View style={styles.logoFallback}>
              <Ionicons name="people" size={40} color="#fff" />
            </View>
          )}

          <Text style={styles.header}>{team.team_name}</Text>

          {/* Info */}
          <View style={styles.infoContainer}>
            {coach && (
              <>
                <Text style={styles.infoLabel}>Manager</Text>
                <Text style={styles.infoValue}>
                  {coach.first_name} {coach.last_name}
                </Text>
              </>
            )}
            <Text style={styles.infoLabel}>Category</Text>
            <Text style={styles.infoValue}>{team.category}</Text>
            <Text style={styles.infoLabel}>League</Text>
            <Text style={styles.infoValue}>{team.league}</Text>
          </View>

          {/* Search */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search players"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />

          <FlatList
            data={filtered}
            keyExtractor={item => String(item.user_id)}
            renderItem={renderPlayer}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false} // prevent nested scroll
          />

         
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:      { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { paddingBottom: 40 },
  centered:      { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backButton:    { position: 'absolute', top: 40, left: 20, zIndex: 10 },
  teamLogo:      { width: 90, height: 90, borderRadius: 45, alignSelf: 'center', marginTop: 80 },
  logoFallback:  {
    backgroundColor: '#22396D',
    width: 90, height: 90, borderRadius: 45,
    alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
    marginTop: 80,
  },
  header:        { fontSize: 24, fontWeight: '700', textAlign: 'center', color: '#22396D', marginVertical: 15 },
  infoContainer: { marginHorizontal: 20, marginBottom: 10 },
  infoLabel:     { fontSize: 14, color: '#888', fontWeight: '500' },
  infoValue:     { fontSize: 16, color: '#22396D', fontWeight: '600', marginBottom: 8 },
  searchBar:     {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    color: '#000',
  },
  playerCard:    {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 6,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  playerIcon:    {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#22396D',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 15,
  },
  playerName:    { fontSize: 16, color: '#22396D' },
  addButton:     {
    backgroundColor: '#22396D',
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addText:       { color: '#fff', fontSize: 16, fontWeight: '600' },
});
