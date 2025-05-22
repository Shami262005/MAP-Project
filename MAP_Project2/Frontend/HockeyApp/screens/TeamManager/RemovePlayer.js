// screens/TeamManager/RemovePlayer.js

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { removePlayer } from '../../src/api/teams';

export default function RemovePlayer({ navigation, route }) {
  const { teamId, player } = route.params;
  const [loading, setLoading]         = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible]     = useState(false);
  const [errorMessage, setErrorMessage]     = useState('');

  const handleRemove = async () => {
    setLoading(true);
    try {
      await removePlayer(teamId, player.user_id);
      setSuccessVisible(true);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Failed to remove player.');
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const closeSuccess = () => {
    setSuccessVisible(false);
    navigation.goBack();
  };
  const closeError = () => setErrorVisible(false);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22396D" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#22396D" />
      </TouchableOpacity>

      <View style={styles.content}>
        <FontAwesome name="user-circle" size={120} color="#22396D" />
        <Text style={styles.name}>
          {player.first_name} {player.last_name}
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{player.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{player.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{player.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>DOB:</Text>
          <Text style={styles.value}>{new Date(player.dob).toDateString()}</Text>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemove}
        >
          <Text style={styles.removeText}>Remove Player</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <FontAwesome name="check-circle" size={70} color="#4BB543" />
            <Text style={styles.title}>Player Removed</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeSuccess}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal visible={errorVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Ionicons name="alert-circle" size={70} color="#E74C3C" />
            <Text style={styles.title}>Error</Text>
            <Text style={styles.note}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeError}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:       { flex:1, backgroundColor:'#fff', paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0 },
  centered:       { flex:1, justifyContent:'center', alignItems:'center' },
  backButton:     { position:'absolute', top:40, left:20, zIndex:1 },
  content:        { flex:1, justifyContent:'center', alignItems:'center', paddingHorizontal:20 },
  name:           { fontSize:22, fontWeight:'700', color:'#22396D', marginVertical:15 },
  infoRow:        { flexDirection:'row', width:'100%', justifyContent:'space-between', marginBottom:10 },
  label:          { fontSize:16, fontWeight:'600', color:'#555' },
  value:          { fontSize:16, color:'#333' },
  removeButton:   { backgroundColor:'#c0392b', paddingVertical:14, paddingHorizontal:30, borderRadius:10, marginTop:30 },
  removeText:     { color:'#fff', fontSize:16, fontWeight:'600' },
  modalContainer: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.4)' },
  popup:          { backgroundColor:'#fff', padding:30, borderRadius:10, alignItems:'center', width:'80%' },
  title:          { fontSize:20, fontWeight:'700', color:'#22396D', marginVertical:10 },
  note:           { fontSize:14, color:'#333', textAlign:'center', marginBottom:20 },
  modalButton:    { backgroundColor:'#22396D', paddingVertical:12, paddingHorizontal:30, borderRadius:8 },
  modalButtonText:{ color:'#fff', fontSize:16, fontWeight:'600' },
});
