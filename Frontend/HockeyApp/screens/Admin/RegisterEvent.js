import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';

export default function RegisterEventScreen({ navigation }) {
  // ─ form fields ─
  const [name, setName]             = useState('');
  const [type, setType]             = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue]           = useState('');
  // ─ date/time pickers ─
  const [date, setDate]             = useState(new Date());
  const [time, setTime]             = useState(new Date());
  const [showIOSDatePicker, setShowIOSDatePicker] = useState(false);
  const [showIOSTimePicker, setShowIOSTimePicker] = useState(false);
  // ─ post‐submit modal ─
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  // ─ invites modal ─
  const [invitesModalVisible, setInvitesModalVisible] = useState(false);
  const [inviteSearch, setInviteSearch] = useState('');
  // track selected players by teamId
  const [selectedPlayers, setSelectedPlayers] = useState({});

  // ─ sample teams + players ─
  const sampleTeams = [
    {
      id: '1',
      name: 'Mighty Lions',
      players: [
        'Adam Scott',
        'Erin Hughes',
        'Keith Wright'
      ],
    },
    {
      id: '2',
      name: 'Sharks',
      players: ['Alice Johnson','Michael Brown','Emily Davis','James Wilson'],
    },
    {
      id: '3',
      name: 'Thunder',
      players: ['Sam Carter','Dana Lee'],
    },
    {
      id: '4',
      name: 'Tigers',
      players: ['Rick Allen','Sara White'],
    },
    {
      id: '5',
      name: 'Wildcats',
      players: ['Nate Grey','Olivia King'],
    },
  ];

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
    } else setShowIOSDatePicker(true);
  };
  const openTimePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({ value: time, onChange: onChangeTime, mode: 'time', is24Hour: false });
    } else setShowIOSTimePicker(true);
  };

  // ─ Invite toggles ─
  const toggleTeam = (teamId, playersList) => {
    const currently = selectedPlayers[teamId] || [];
    // if all already selected, clear; else select all
    setSelectedPlayers({
      ...selectedPlayers,
      [teamId]: currently.length === playersList.length ? [] : [...playersList],
    });
  };
  const togglePlayer = (teamId, player) => {
    const currently = selectedPlayers[teamId] || [];
    setSelectedPlayers({
      ...selectedPlayers,
      [teamId]: currently.includes(player)
        ? currently.filter((p) => p !== player)
        : [...currently, player],
    });
  };

  // ─ Filter teams & players by search ─
  const filtered = sampleTeams.filter((team) => {
    const tn = team.name.toLowerCase();
    const sq = inviteSearch.toLowerCase();
    const teamMatch   = tn.includes(sq);
    const playerMatch = team.players.some((p) => p.toLowerCase().includes(sq));
    return teamMatch || playerMatch;
  });

  // ─ Flat list of selected player names for chips ─
  const invitedNames = Object.values(selectedPlayers).flat();

  // ─ Submit ─
  const handleCreate = () => {
    // TODO: API…
    setSuccessModalVisible(true);
  };
  const closeSuccess = () => {
    setSuccessModalVisible(false);
    navigation.goBack();
  };

  return (
    <>
      {/* Status Bar & SafeArea */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView
        style={[styles.safe, Platform.OS==='android' && { paddingTop: StatusBar.currentHeight }]}
      >
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
              <View style={styles.headerRightPlaceholder} />
            </View>

            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={60} color="#D32F2F" />
            </View>

            {/* Simple TextFields */}
            {[
              { val: name,   set: setName,   ph: 'Name' },
              { val: type,   set: setType,   ph: 'Type' },
              { val: venue,  set: setVenue,  ph: 'Venue' },
            ].map(({val,set,ph})=>(
              <TextInput
                key={ph}
                style={styles.input}
                placeholder={ph}
                placeholderTextColor="#888"
                value={val}
                onChangeText={set}
              />
            ))}
            <TextInput
              style={[styles.input,styles.multiline]}
              placeholder="Description"
              placeholderTextColor="#888"
              value={description}
              onChangeText={setDescription}
              multiline numberOfLines={4} textAlignVertical="top"
            />

            {/* Date */}
            <TouchableOpacity style={styles.inputWithIcon} onPress={openDatePicker}>
              <Text style={styles.dateText}>
                {date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
              </Text>
              <Ionicons name="calendar" size={24} color="#22396D" />
            </TouchableOpacity>
            {showIOSDatePicker && Platform.OS==='ios' && (
              <DateTimePicker value={date} mode="date" display="spinner" onChange={onChangeDate}/>
            )}

            {/* Time */}
            <TouchableOpacity style={styles.inputWithIcon} onPress={openTimePicker}>
              <Text style={styles.dateText}>
                {time.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}
              </Text>
              <Ionicons name="time" size={24} color="#22396D" />
            </TouchableOpacity>
            {showIOSTimePicker && Platform.OS==='ios' && (
              <DateTimePicker value={time} mode="time" display="spinner" onChange={onChangeTime}/>
            )}

            {/* Invites Field */}
            <TouchableOpacity
              style={styles.inputWithIcon}
              onPress={() => setInvitesModalVisible(true)}
            >
              <Text style={styles.dateText}>
                {invitedNames.length
                  ? `${invitedNames.length} invited`
                  : 'Invites'}
              </Text>
              <Ionicons name="add" size={24} color="#22396D" />
            </TouchableOpacity>

            {/* Invite Chips */}
            {invitedNames.length>0 && (
              <ScrollView horizontal style={styles.chipsContainer}>
                {invitedNames.map((n) => (
                  <View key={n} style={styles.chip}>
                    <Text style={styles.chipText}>{n}</Text>
                  </View>
                ))}
              </ScrollView>
            )}

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
            {/* Search */}
            <TextInput
              style={styles.modalSearch}
              placeholder="Search teams or players"
              placeholderTextColor="#888"
              value={inviteSearch}
              onChangeText={setInviteSearch}
            />

            <ScrollView style={{ maxHeight: 300 }}>
              {filtered.map((team) => {
                const selPlayers = selectedPlayers[team.id]||[];
                const allSelected = selPlayers.length === team.players.length;
                const visiblePlayers = team.players.filter(p =>
                  p.toLowerCase().includes(inviteSearch.toLowerCase())
                );
                return (
                  <View key={team.id} style={{ marginBottom:12 }}>
                    {/* Team Row */}
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={()=>toggleTeam(team.id,team.players)}
                    >
                      <Ionicons
                        name={allSelected?'checkbox':'square-outline'}
                        size={24}
                        color="#22396D"
                        style={{ marginRight:10 }}
                      />
                      <Text style={styles.modalItemTitle}>{team.name}</Text>
                    </TouchableOpacity>
                    {/* Players */}
                    {visiblePlayers.map((player) => {
                      const isSel = selPlayers.includes(player);
                      return (
                        <TouchableOpacity
                          key={player}
                          style={styles.modalSubItem}
                          onPress={()=>togglePlayer(team.id,player)}
                        >
                          <Ionicons
                            name={isSel?'checkbox':'square-outline'}
                            size={20}
                            color="#22396D"
                            style={{ marginRight:8 }}
                          />
                          <Text style={styles.modalSubText}>{player}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
            </ScrollView>

            {/* Buttons */}
            <View style={styles.modalBtns}>
              <TouchableOpacity onPress={()=>setInvitesModalVisible(false)}>
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setInvitesModalVisible(false)}>
                <Text style={[styles.modalBtnText,{ color:'#22396D' }]}>OK</Text>
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

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor:'#fff' },
  header:  { flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,paddingBottom:5 },
  headerTitle: { fontSize:20,fontWeight:'700',color:'#22396D' },
  headerRightPlaceholder: { width:24 },

  container: { paddingHorizontal:20,paddingTop:20,paddingBottom:40 },
  iconContainer: { alignItems:'center',marginBottom:20 },
  input:    { backgroundColor:'#F1F1F1',borderRadius:10,padding:12,marginBottom:15,color:'#000' },
  multiline:{ height:100 },
  inputWithIcon: { flexDirection:'row',alignItems:'center',backgroundColor:'#F1F1F1',borderRadius:10,paddingHorizontal:12,paddingVertical:12,marginBottom:15,justifyContent:'space-between' },
  dateText: { fontSize:16,color:'#000' },

  chipsContainer:{ flexDirection:'row',marginBottom:15 },
  chip:   { backgroundColor:'#E0E0E0',paddingHorizontal:12,paddingVertical:6,borderRadius:20,marginRight:8 },
  chipText:{ color:'#000',fontSize:14 },

  submitButton:{ backgroundColor:'#22396D',borderRadius:10,paddingVertical:14,marginTop:10,alignItems:'center' },
  submitText:{ color:'#fff',fontSize:16,fontWeight:'600' },

  // ─ Modal ─
  modalOverlay:{ flex:1,backgroundColor:'rgba(0,0,0,0.4)',justifyContent:'center',paddingHorizontal:20 },
  modalBox:{ backgroundColor:'#fff',borderRadius:12,padding:15 },
  modalSearch:{ backgroundColor:'#F1F1F1',borderRadius:10,padding:10,marginBottom:10,color:'#000' },

  modalItem:{ flexDirection:'row',alignItems:'center',paddingVertical:8 },
  modalItemTitle:{ fontWeight:'600',color:'#22396D',fontSize:16 },
  modalSubItem:{ flexDirection:'row',alignItems:'center',paddingVertical:4,paddingLeft:32 },
  modalSubText:{ fontSize:14,color:'#000' },

  modalBtns:{ flexDirection:'row',justifyContent:'flex-end',paddingTop:10 },
  modalBtnText:{ fontSize:16,color:'#888',marginLeft:20 },

  // ─ Success ─
  successBox:{ backgroundColor:'#fff',borderRadius:20,padding:25,alignItems:'center' },
  modalTitle:{ color:'#22396D',fontSize:20,fontWeight:'700',marginVertical:15,textAlign:'center' },
  modalButton:{ marginTop:20,backgroundColor:'#22396D',paddingVertical:12,paddingHorizontal:40,borderRadius:10 },
  modalButtonText:{ color:'#fff',fontWeight:'600',fontSize:16 },
});
