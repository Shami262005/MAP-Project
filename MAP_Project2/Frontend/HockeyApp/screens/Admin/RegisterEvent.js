// screens/TeamManager/RegisterEvent.js

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { listTeams, getTeamDetails } from '../../src/api/teams';
import { createEvent } from '../../src/api/events';

export default function RegisterEventScreen({ navigation }) {
  // ─ form fields ─
  const [name, setName] = useState('');
  const [venue, setVenue] = useState('');
  const [type, setType] = useState('league');
  const [description, setDescription] = useState('');
  // ─ date/time pickers ─
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showIOSDatePicker, setShowIOSDatePicker] = useState(false);
  const [showIOSTimePicker, setShowIOSTimePicker] = useState(false);
  // ─ post‐submit modal ─
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  // ─ invites modal ─
  const [invitesModalVisible, setInvitesModalVisible] = useState(false);
  const [inviteSearch, setInviteSearch] = useState('');
  // ─ teams + players from backend ─
  const [teams, setTeams] = useState([]); // each entry: { team, coach, players }
  const [selectedPlayers, setSelectedPlayers] = useState({});

  // ─ fetch teams + details on mount ─
  useEffect(() => {
    (async () => {
      try {
        const basic = await listTeams(); // { team_id, team_name, ... }[]
        const detailed = await Promise.all(
          basic.map(t => getTeamDetails(t.team_id))
        );
        setTeams(detailed);
      } catch (err) {
        console.error('Failed loading teams', err);
        Alert.alert('Error', 'Could not load teams.');
      }
    })();
  }, []);

  // ─ Date/Time handlers ─
  const onChangeDate = (_, selected) => {
    if (selected) setDate(selected);
    if (Platform.OS === 'ios') setShowIOSDatePicker(false);
  };
  const onChangeTime = (_, selected) => {
    if (selected) setTime(selected);
    if (Platform.OS === 'ios') setShowIOSTimePicker(false);
  };
  const openDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({ value: date, onChange: onChangeDate, mode: 'date' });
    } else {
      setShowIOSDatePicker(true);
    }
  };
  const openTimePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({ value: time, onChange: onChangeTime, mode: 'time', is24Hour: false });
    } else {
      setShowIOSTimePicker(true);
    }
  };

  // ─ Invite toggles ─
  const toggleTeam = teamId => {
    if (selectedPlayers.hasOwnProperty(teamId)) {
      const copy = { ...selectedPlayers };
      delete copy[teamId];
      setSelectedPlayers(copy);
    } else {
      const { coach, players, team } = teams.find(t => t.team.team_id === teamId);
      const ids = [
        ...(coach ? [coach.user_id] : []),
        ...players.map(p => p.user_id)
      ];
      setSelectedPlayers({ ...selectedPlayers, [team.team_id]: ids });
    }
  };
  const togglePlayer = (teamId, userId) => {
    const current = selectedPlayers[teamId] || [];
    const next = current.includes(userId)
      ? current.filter(id => id !== userId)
      : [...current, userId];
    setSelectedPlayers({ ...selectedPlayers, [teamId]: next });
  };

  // ─ Filter by search ─
  const filtered = teams.filter(({ team, coach, players }) => {
    const sq = inviteSearch.toLowerCase();
    const teamMatch = team.team_name.toLowerCase().includes(sq);
    const coachMatch = coach
      ? `${coach.first_name} ${coach.last_name}`.toLowerCase().includes(sq)
      : false;
    const playerMatch = players.some(p =>
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(sq)
    );
    return teamMatch || coachMatch || playerMatch;
  });

  const invitedCount = Object.values(selectedPlayers).flat().length;

  // ─ Submit ─
  const handleCreate = async () => {
    if (!name.trim() || !venue.trim() || !type) {
      return Alert.alert('Missing fields', 'Name, venue & type are required.');
    }
    const invitees = Object.values(selectedPlayers).flat();
    try {
      await createEvent({
        event_name: name,
        type,
        venue,
        description,
        date: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          time.getHours(),
          time.getMinutes()
        ).toISOString(),
        invitees
      });
      setSuccessModalVisible(true);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', err.response?.data?.error || 'Failed to create event.');
    }
  };
  const closeSuccess = () => {
    setSuccessModalVisible(false);
    navigation.goBack();
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={[styles.safe, Platform.OS==='android' && { paddingTop: StatusBar.currentHeight }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS==='ios'?'padding':'height'}
          style={{ flex:1 }}
          keyboardVerticalOffset={10}
        >
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#22396D" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Add Event</Text>
              <View style={styles.headerRightPlaceholder}/>
            </View>

            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={60} color="#D32F2F" />
            </View>

            {/* Name */}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />

            {/* Venue */}
            <Text style={styles.label}>Venue</Text>
            <TextInput
              style={styles.input}
              placeholder="Venue"
              placeholderTextColor="#888"
              value={venue}
              onChangeText={setVenue}
            />

            {/* Type */}
            <Text style={styles.label}>Type</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={type} onValueChange={setType}>
                <Picker.Item label="League" value="league" />
                <Picker.Item label="Friendly" value="friendly" />
                <Picker.Item label="Practice" value="practice" />
                <Picker.Item label="Meeting" value="meeting" />
              </Picker>
            </View>

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              placeholder="Description"
              placeholderTextColor="#888"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />

            {/* Date */}
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.inputWithIcon} onPress={openDatePicker}>
              <Text style={styles.dateText}>
                {date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
              </Text>
              <Ionicons name="calendar" size={24} color="#22396D" />
            </TouchableOpacity>
            {showIOSDatePicker && Platform.OS==='ios' && (
              <DateTimePicker value={date} mode="date" display="spinner" onChange={onChangeDate} />
            )}

            {/* Time */}
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity style={styles.inputWithIcon} onPress={openTimePicker}>
              <Text style={styles.dateText}>
                {time.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}
              </Text>
              <Ionicons name="time" size={24} color="#22396D" />
            </TouchableOpacity>
            {showIOSTimePicker && Platform.OS==='ios' && (
              <DateTimePicker value={time} mode="time" display="spinner" onChange={onChangeTime} />
            )}

            {/* Invites */}
            <Text style={styles.label}>Invites</Text>
            <TouchableOpacity
              style={styles.inputWithIcon}
              onPress={() => setInvitesModalVisible(true)}
            >
              <Text style={styles.dateText}>
                {invitedCount ? `${invitedCount} invited` : 'Select invites'}
              </Text>
              <Ionicons name="add" size={24} color="#22396D" />
            </TouchableOpacity>

            {/* Submit */}
            <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
              <Text style={styles.submitText}>Create Event</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Invites Modal */}
      <Modal visible={invitesModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TextInput
              style={styles.modalSearch}
              placeholder="Search teams or players"
              placeholderTextColor="#888"
              value={inviteSearch}
              onChangeText={setInviteSearch}
            />
            <ScrollView style={{ maxHeight: 300 }}>
              {filtered.map(({ team, coach, players }) => {
                const sel = selectedPlayers[team.team_id] || [];
                const totalCount = (coach ? 1 : 0) + players.length;
                const allSel = sel.length === totalCount;
                return (
                  <View key={team.team_id} style={{ marginBottom: 12 }}>
                    {/* team-level */}
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => toggleTeam(team.team_id)}
                    >
                      <Ionicons
                        name={allSel ? 'checkbox' : 'square-outline'}
                        size={24}
                        color="#22396D"
                        style={{ marginRight: 10 }}
                      />
                      <Text style={styles.modalItemTitle}>{team.team_name}</Text>
                    </TouchableOpacity>
                    {/* coach */}
                    {coach && (
                      <TouchableOpacity
                        style={styles.modalSubItem}
                        onPress={() => togglePlayer(team.team_id, coach.user_id)}
                      >
                        <Ionicons
                          name={sel.includes(coach.user_id) ? 'checkbox' : 'square-outline'}
                          size={20}
                          color="#22396D"
                          style={{ marginRight: 8 }}
                        />
                        <Text style={styles.modalSubText}>
                          {coach.first_name} {coach.last_name} (Manager)
                        </Text>
                      </TouchableOpacity>
                    )}
                    {/* players */}
                    {players.map(p => (
                      <TouchableOpacity
                        key={p.user_id}
                        style={styles.modalSubItem}
                        onPress={() => togglePlayer(team.team_id, p.user_id)}
                      >
                        <Ionicons
                          name={sel.includes(p.user_id) ? 'checkbox' : 'square-outline'}
                          size={20}
                          color="#22396D"
                          style={{ marginRight: 8 }}
                        />
                        <Text style={styles.modalSubText}>
                          {p.first_name} {p.last_name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.modalBtns}>
              <TouchableOpacity onPress={() => setInvitesModalVisible(false)}>
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setInvitesModalVisible(false)}>
                <Text style={[styles.modalBtnText, { color: '#22396D' }]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={100} color="#4BB543" />
            <Text style={styles.modalTitle}>Event Successfully Created</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeSuccess}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  headerRightPlaceholder: { width: 24 },
  iconContainer: { alignItems: 'center', marginBottom: 20 },
  label: { marginHorizontal: 20, marginBottom: 4, color: '#22396D', fontWeight: '600' },
  container: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  input: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: '#000',
  },
  multiline: { height: 100 },
  pickerWrapper: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    marginBottom: 15,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  dateText: { fontSize: 16, color: '#000' },
  submitButton: {
    backgroundColor: '#22396D',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalBox: { backgroundColor: '#fff', borderRadius: 12, padding: 15 },
  modalSearch: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: '#000',
  },
  modalItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  modalItemTitle: { fontWeight: '600', color: '#22396D', fontSize: 16 },
  modalSubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 32,
  },
  modalSubText: { fontSize: 14, color: '#000' },
  modalBtns: { flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10 },
  modalBtnText: { fontSize: 16, color: '#888', marginLeft: 20 },

  successBox: { backgroundColor: '#fff', borderRadius: 20, padding: 25, alignItems: 'center' },
  modalTitle: { color: '#22396D', fontSize: 20, fontWeight: '700', marginVertical: 15, textAlign: 'center' },
  modalButton: { marginTop: 20, backgroundColor: '#22396D', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10 },
  modalButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
