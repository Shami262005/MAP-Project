// screens/TeamManager/TeamScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
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
  Keyboard,
} from 'react-native';
import { Ionicons, FontAwesome,MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { getTeamDetails } from '../../src/api/teams';

export default function TeamScreen({ navigation, route }) {
  const teamId = route.params?.teamId;
  const isFocused = useIsFocused();

  const [team, setTeam]           = useState(null);
  const [coach, setCoach]         = useState(null);
  const [players, setPlayers]     = useState([]);
  const [search, setSearch]       = useState('');
  const [loading, setLoading]     = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // hide bottom nav when keyboard opens
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  // fetch team details on focus
  const fetchTeam = useCallback(async () => {
    if (!teamId) return;
    setLoading(true);
    try {
      const { team: t, coach: c, players: p } = await getTeamDetails(teamId);
      setTeam(t);
      setCoach(c);
      setPlayers(p);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    if (isFocused) fetchTeam();
  }, [isFocused, fetchTeam]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22396D" />
      </View>
    );
  }

  const filtered = players.filter(u =>
    (`${u.first_name} ${u.last_name}`).toLowerCase().includes(search.toLowerCase())
  );

  const renderPlayer = ({ item }) => (
    <TouchableOpacity
      style={styles.playerCard}
      onPress={() => {/* view profile */}}
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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
      >
        <FlatList
          data={filtered}
          keyExtractor={item => String(item.user_id)}
          renderItem={renderPlayer}
          ListHeaderComponent={
            <>
             

              <View style={styles.headerContainer}>
                {team.logo_url
                  ? <Image source={{ uri: team.logo_url }} style={styles.teamLogo} />
                  : <View style={styles.logoFallback}>
                      <Ionicons name="people" size={50} color="#fff" />
                    </View>
                }
                <Text style={styles.header}>{team.team_name}</Text>
              </View>

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

              <View style={styles.searchWrapper}>
                <Ionicons name="search" size={18} color="#888" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search players"
                  placeholderTextColor="#888"
                  value={search}
                  onChangeText={setSearch}
                />
              </View>
            </>
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>

      {/* bottom nav inside its own SafeAreaView for bottom inset */}
      {!keyboardVisible && (
        <SafeAreaView edges={['bottom']} style={styles.navSafe}>
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('Team', { teamId })}
            >
              <Ionicons name="people" size={24} color="#22396D" />
              <Text style={[styles.navLabel, { color: '#22396D' }]}>Team</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('AnnouncementScreen')}
            >
              <Ionicons name="megaphone" size={24} color="#666" />
              <Text style={styles.navLabel}>Announcements</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('Events')}
            >
             <MaterialIcons name="event" size={24} color="#22396D" />
              <Text style={styles.navLabel}>Events</Text>
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
  centered:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backButton:  { position:'absolute', top:40, left:20, zIndex:1 },

  headerContainer:{
    alignItems:   'center',
    paddingTop:   20,
    marginBottom: 10,
  },
  teamLogo:    { width:100, height:100, borderRadius:50, marginBottom:10 },
  logoFallback:{
    width:100, height:100, borderRadius:50,
    backgroundColor:'#22396D',
    alignItems:'center', justifyContent:'center',
    marginBottom:10
  },
  header:      { fontSize:26, fontWeight:'700', color:'#22396D' },

  infoContainer:{ paddingHorizontal:20, marginBottom:10 },
  infoLabel:   { fontSize:14, color:'#888', fontWeight:'500' },
  infoValue:   { fontSize:16, color:'#22396D', fontWeight:'600', marginBottom:6 },

  searchWrapper:{
    flexDirection:'row', alignItems:'center',
    backgroundColor:'#F5F5F5',
    marginHorizontal:20, borderRadius:8,
    paddingHorizontal:10, paddingVertical:8,
    marginBottom:10
  },
  searchInput: { flex:1, marginLeft:8, color:'#000' },

  listContent: { paddingBottom:10 },

  playerCard:{
    flexDirection:'row', alignItems:'center',
    marginHorizontal:20, marginVertical:6,
    padding:15, backgroundColor:'#fff',
    borderRadius:10, elevation:4,
    shadowColor:'#000', shadowOffset:{width:0,height:2},
    shadowOpacity:0.1, shadowRadius:4
  },
  playerIcon:{
    width:30,height:30,borderRadius:15,
    backgroundColor:'#22396D',
    alignItems:'center',justifyContent:'center',
    marginRight:15
  },
  playerName:  { fontSize:16, color:'#22396D' },

  bottomNav:{
    flexDirection:'row',justifyContent:'space-around',alignItems:'center',
    height:60
  },
  navItem:     { alignItems:'center' },
  navLabel:    { fontSize:12, color:'#666', marginTop:2 },
});
