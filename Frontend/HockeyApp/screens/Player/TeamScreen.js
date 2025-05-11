// TeamScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const players = [
  { id: '1', name: 'Alice Johnson', logo: require('../../assets/logo.png') },
  { id: '2', name: 'Michael Brown', logo: require('../../assets/logo.png') },
  { id: '3', name: 'Emily Davis', logo: require('../../assets/logo.png') },
  { id: '4', name: 'James Wilson', logo: require('../../assets/logo.png') },
];

export default function TeamScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />

      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.teamName}>Wildcats</Text>
      <Text style={styles.manager}>Team Player</Text>
      <Text style={styles.slogan}>"One Team. One Goal."</Text>

      <View style={styles.playerHeader}>
        <Text style={styles.playersLabel}>Players</Text>
        <Text style={styles.playerCount}>{players.length}</Text>
      </View>

      <TextInput style={styles.searchBar} placeholder="Search player" />

      <FlatList
        data={players}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerRow}>
            <Image source={item.logo} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people" size={24} color="red" />
          <Text style={[styles.navLabel, { color: 'red' }]}>Team</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AnnouncementScreen')}
          style={styles.navItem}
        >
          <Ionicons name="megaphone" size={24} color="#666" />
          <Text style={styles.navLabel}>Announcements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Events')}
          style={styles.navItem}
        >
          <MaterialIcons name="event" size={24} color="#666" />
          <Text style={styles.navLabel}>Events</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:    { flex: 1, backgroundColor: '#fff' },
  logo:        {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  teamName:    { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#1e3b74', marginVertical: 10 },
  manager:     { textAlign: 'center', color: '#1e3b74', marginBottom: 4 },
  slogan:      { textAlign: 'center', fontStyle: 'italic', marginBottom: 10 },
  playerHeader:{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:20, marginBottom:10 },
  playersLabel:{ fontSize:16, fontWeight:'bold', color:'#1e3b74' },
  playerCount:{ fontSize:16, color:'#1e3b74' },
  searchBar:   { borderColor:'#ccc', borderWidth:1, borderRadius:8, padding:8, marginHorizontal:20, marginBottom:10 },
  playerRow:   { flexDirection:'row', alignItems:'center', padding:10, marginHorizontal:20, borderBottomColor:'#eee', borderBottomWidth:1 },
  avatar:      { width:35, height:35, borderRadius:20, marginRight:10 },
  name:        { fontSize:16, color:'#1e3b74' },
  bottomNav:   {
    flexDirection: 'row',
    justifyContent:   'space-around',
    alignItems:      'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopColor:  '#ddd',
    borderTopWidth:  1,
  },
  navItem:     { alignItems:'center' },
  navLabel:    { fontSize:12, color:'#666', marginTop:2 },
});

