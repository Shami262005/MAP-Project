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
import { deleteUser } from '../../src/api/users';

// calculate age from date of birth
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function RemovePlayer({ navigation, route }) {
  const { player } = route.params;
  const [loading, setLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const handleDelete = async () => {
    setConfirmVisible(false);
    setLoading(true);
    try {
      await deleteUser(player.user_id);
      setSuccessVisible(true);
    } catch (err) {
      console.error('Failed to delete player:', err);
    } finally {
      setLoading(false);
    }
  };

  const closeSuccess = () => {
    setSuccessVisible(false);
    navigation.goBack();   // back to Team screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={Platform.OS === 'android'}
      />

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
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{player.gender}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{player.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{player.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>{calculateAge(player.dob)}</Text>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => setConfirmVisible(true)}
        >
          <Text style={styles.removeText}>Remove Player</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Ionicons name="help-circle" size={70} color="#22396D" />
            <Text style={styles.title}>Confirm Delete</Text>
            <Text style={styles.note}>
              Are you sure you want to delete this player?
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setConfirmVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <FontAwesome name="check-circle" size={70} color="#4BB543" />
            <Text style={styles.title}>Deleted Successfully</Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.successButton]}
              onPress={closeSuccess}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#22396D" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: '#fff' },
  backButton:      { position: 'absolute', top: 40, left: 20, zIndex: 1 },
  content:         { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  name:            { fontSize: 22, fontWeight: '700', color: '#22396D', marginVertical: 15 },
  infoRow:         { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 10 },
  label:           { fontSize: 16, fontWeight: '600', color: '#555' },
  value:           { fontSize: 16, color: '#333' },
  removeButton:    { backgroundColor: '#c0392b', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 10, marginTop: 30 },
  removeText:      { color: '#fff', fontSize: 16, fontWeight: '600' },

  modalContainer:  { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  popup:           { backgroundColor: '#fff', padding: 30, borderRadius: 10, alignItems: 'center', width: '80%' },
  title:           { fontSize: 20, fontWeight: '700', color: '#22396D', marginVertical: 10 },
  note:            { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 20 },

  buttonRow:       { flexDirection: 'row', justifyContent: 'center', width: '100%' },
  modalButton:     {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    minWidth: 100,
  },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelButton:    { backgroundColor: '#ccc' },
  cancelText:      { color: '#333' },
  deleteButton:    { backgroundColor: '#c0392b' },
  successButton:   { backgroundColor: '#22396D', marginTop: 10, width: '60%' },

  loadingOverlay:  {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});
