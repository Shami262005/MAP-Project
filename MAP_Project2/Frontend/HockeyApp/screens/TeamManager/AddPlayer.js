// screens/TeamManager/AddPlayer.js

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { addPlayer, getTeamDetails } from '../../src/api/teams';

export default function AddPlayer({ navigation, route }) {
  const teamId = route.params?.teamId;

  const [teamCategory, setTeamCategory] = useState(null);
  const [firstName, setFirstName]       = useState('');
  const [lastName, setLastName]         = useState('');
  const [phone, setPhone]               = useState('');
  const [email, setEmail]               = useState('');
  const [gender, setGender]             = useState('male');
  const [dob, setDob]                   = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading]           = useState(false);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);

  // fetch team category on mount
  useEffect(() => {
    (async () => {
      try {
        const { team } = await getTeamDetails(teamId);
        setTeamCategory(team.category); // 'male' or 'female'
      } catch (err) {
        console.error('Failed to load team category', err);
      }
    })();
  }, [teamId]);

  const showError = msg => {
    setErrorMessage(msg);
    setErrorVisible(true);
  };

  const validateEmail = e => /^\S+@\S+\.\S+$/.test(e);
  const validatePhone = p => /^08(?:1|5)\d{7}$/.test(p);
  const isOver18 = date => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const onChangeDate = (event, selected) => {
    setShowDatePicker(false);
    if (selected) setDob(selected);
  };

  const handleAdd = async () => {
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
      return showError('Please fill in all fields.');
    }
    if (!validatePhone(phone.trim())) {
      return showError('Phone must start with 081 or 085 and be 10 digits.');
    }
    if (!validateEmail(email.trim())) {
      return showError('Please enter a valid email address.');
    }
    if (!isOver18(dob)) {
      return showError('Player must be at least 18 years old.');
    }
    if (teamCategory && gender !== teamCategory) {
      return showError(
        `This is a ${teamCategory} team; you may only add ${teamCategory} players.`
      );
    }

    setLoading(true);
    try {
      await addPlayer(teamId, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        gender,
        dob: dob.toISOString().split('T')[0],
      });
      setSuccessVisible(true);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Failed to add player.';
      if (msg.toLowerCase().includes('email')) {
        showError('That email is already in use.');
      } else {
        showError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => setErrorVisible(false);
  const closeSuccess = () => {
    setSuccessVisible(false);
    navigation.goBack();
  };

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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#22396D" />
        </TouchableOpacity>
        <Text style={styles.header}>Add Player</Text>

        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Phone (081xxxxxxx or 085xxxxxxx)"
          keyboardType="phone-pad"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={gender} onValueChange={setGender}>
            <Picker.Item label="Male"   value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{dob.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            maximumDate={new Date()}
            display="default"
            onChange={onChangeDate}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <FontAwesome name="check-circle" size={70} color="#4BB543" />
            <Text style={styles.title}>Player Added</Text>
            <Text style={styles.note}>
              Inform the player to enter the code sent to their email to finish setup.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeSuccess}>
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
            <TouchableOpacity style={styles.modalButton} onPress={closeError}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:       { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container:      { flex: 1, padding: 20 },
  backButton:     { position: 'absolute', top: 20, left: 20, zIndex: 1 },
  header:         { fontSize: 22, fontWeight: '700', color: '#22396D', textAlign: 'center', marginBottom: 20 },
  input:          { backgroundColor: '#F1F1F1', padding: 12, borderRadius: 10, marginBottom: 15, color: '#000' },
  label:          { marginBottom: 5, fontWeight: '600', color: '#22396D' },
  pickerWrapper:  { backgroundColor: '#F1F1F1', borderRadius: 10, marginBottom: 15 },
  dateInput:      { backgroundColor: '#F1F1F1', padding: 12, borderRadius: 10, marginBottom: 15 },
  dateText:       { color: '#000' },
  button:         { backgroundColor: '#22396D', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText:     { color: '#fff', fontSize: 16, fontWeight: '600' },
  centered:       { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  popup:          { backgroundColor: '#fff', padding: 30, borderRadius: 10, alignItems: 'center', width: '80%' },
  title:          { fontSize: 20, fontWeight: '700', color: '#22396D', marginVertical: 10 },
  note:           { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 20 },
  modalButton:    { backgroundColor: '#22396D', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  modalButtonText:{ color: '#fff', fontSize: 16, fontWeight: '600' },
});
