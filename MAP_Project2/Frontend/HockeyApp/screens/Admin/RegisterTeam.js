// screens/Common/RegisterTeamScreen.js

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API } from '../../src/api/client';

export default function RegisterTeamScreen({ navigation }) {
  const [teamName, setTeamName]     = useState('');
  const [logo, setLogo]             = useState(null);
  const [category, setCategory]     = useState('male');               
  const [league, setLeague]         = useState('junior league');      
  const [address, setAddress]       = useState('');
  const [contact, setContact]       = useState('');
  const [firstName, setFirstName]   = useState('');
  const [lastName, setLastName]     = useState('');
  const [gender, setGender]         = useState('male');               
  const [dob, setDob]               = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail]           = useState('');

  const [modalVisible, setModalVisible]       = useState(false);
  const [errorVisible, setErrorVisible]       = useState(false);
  const [errorMessage, setErrorMessage]       = useState('');

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  const onChangeDate = (event, selected) => {
    setShowDatePicker(false);
    if (selected) setDob(selected);
  };

  const showError = msg => {
    setErrorMessage(msg);
    setErrorVisible(true);
  };

  const handleCreate = async () => {
    // Required fields
    if (!teamName || !address || !contact || !firstName || !lastName || !email) {
      return showError('Please fill in all required fields.');
    }
    // Email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return showError('Please enter a valid email address.');
    }
    // Contact number
    const phoneRegex = /^(081|085)\d{7}$/;
    if (!phoneRegex.test(contact)) {
      return showError('Contact must be 10 digits starting with 081 or 085.');
    }
    // Age >=18
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    if (age < 18) {
      return showError('Team manager must be at least 18 years old.');
    }

    try {
      const formData = new FormData();
      formData.append('team_name', teamName);
      formData.append('contact', contact);
      formData.append('team_address', address);
      formData.append('category', category);
      formData.append('league', league);
      const manager = {
        first_name: firstName,
        last_name: lastName,
        phone: contact,
        email,
        gender,
        dob: dob.toISOString().split('T')[0],
      };
      formData.append('manager', JSON.stringify(manager));
      if (logo) {
        const uriParts = logo.split('.');
        const ext = uriParts[uriParts.length - 1];
        formData.append('logo', {
          uri: logo,
          name: `logo.${ext}`,
          type: `image/${ext}`,
        });
      }
      await API.post('/teams', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setModalVisible(true);
    } catch (err) {
      const errMsg = err.response?.data?.error || '';
      if (errMsg.includes('team_team_name_key')) {
        showError('That team name is already taken.');
      } else if (errMsg.includes('users_email_key')) {
        showError('That email is already in use.');
      } else {
        showError(errMsg || 'Failed to create team.');
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Teams');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#22396D" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.heading}>Register Team</Text>

          <Text style={styles.section}>Team Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Team Name"
            value={teamName}
            onChangeText={setTeamName}
          />

          <Text style={styles.section}>Team Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.section}>Contact Details</Text>
          <TextInput
            style={styles.input}
            placeholder="081XXXXXXX"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />

          <Text style={styles.section}>Team Logo</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {logo ? (
              <Image source={{ uri: logo }} style={styles.imagePreview} />
            ) : (
              <Ionicons name="image-outline" size={40} color="#22396D" />
            )}
          </TouchableOpacity>

          <Text style={styles.section}>Team Category</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={category} onValueChange={setCategory}>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>

          <Text style={styles.section}>League</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={league} onValueChange={setLeague}>
              <Picker.Item label="Junior League"  value="junior league" />
              <Picker.Item label="First Division" value="first division" />
              <Picker.Item label="Premier League" value="premier league" />
            </Picker>
          </View>

          <Text style={styles.section}>Team Manager Details</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <Text style={styles.section}>Gender</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={gender} onValueChange={setGender}>
              <Picker.Item label="Male"   value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>

          <Text style={styles.section}>Date of Birth</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
            <Text style={{ color: '#000' }}>{dob.toDateString()}</Text>
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

          <Text style={styles.section}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
            <Text style={styles.submitText}>CREATE</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={100} color="#4BB543" />
            <Text style={styles.modalTitle}>Team Successfully Created</Text>
            <Text style={styles.modalMessage}>
              Inform the team manager to enter the code sent to their email to finish setup.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal
        visible={errorVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setErrorVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle" size={80} color="#E74C3C" />
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setErrorVisible(false)}
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
  container: { padding: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 6, color: '#22396D', fontWeight: '600', fontSize: 16 },
  heading: { fontSize: 22, fontWeight: '700', color: '#22396D', textAlign: 'center', marginBottom: 20 },
  section: { marginTop: 15, marginBottom: 5, fontWeight: '600', color: '#22396D' },
  input: { backgroundColor: '#F1F1F1', padding: 12, borderRadius: 10, marginBottom: 10, color: '#000' },
  pickerWrapper: { backgroundColor: '#F1F1F1', borderRadius: 10, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  imagePicker: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#22396D',
    borderRadius: 12,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  imagePreview: { width: '100%', height: '100%', borderRadius: 12 },
  submitButton: { backgroundColor: '#22396D', borderRadius: 10, paddingVertical: 14, marginTop: 20, marginBottom: 30, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 25, alignItems: 'center' },
  modalTitle: { color: '#22396D', fontSize: 20, fontWeight: '700', textAlign: 'center', marginVertical: 15 },
  modalMessage: { color: '#555', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  modalButton: { marginTop: 25, backgroundColor: '#22396D', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10 },
  modalButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
