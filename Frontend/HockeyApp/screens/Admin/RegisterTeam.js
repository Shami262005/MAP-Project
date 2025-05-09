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

export default function RegisterTeamScreen({ navigation }) {
  const [teamName, setTeamName] = useState('');
  const [logo, setLogo] = useState(null);
  const [category, setCategory] = useState('Male Hockey Team');
  const [league, setLeague] = useState('League A');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
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

  const handleCreate = () => {
    setModalVisible(true);
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
          {/* Back */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#22396D" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.heading}>Register Team</Text>

          {/* Team Information */}
          <Text style={styles.section}>Team Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Team Name"
            value={teamName}
            onChangeText={setTeamName}
          />

          {/* Profile Logo Picker like Announcement */}
          <Text style={styles.section}>Team Logo</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {logo ? (
              <Image source={{ uri: logo }} style={styles.imagePreview} />
            ) : (
              <Ionicons name="image-outline" size={40} color="#22396D" />
            )}
          </TouchableOpacity>
          <Text style={styles.imageLabel}>Add Image</Text>

          {/* Category */}
          <Text style={styles.section}>Team Category</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={category} onValueChange={setCategory}>
              <Picker.Item label="Male Hockey Team" value="Male Hockey Team" />
              <Picker.Item label="Female Hockey Team" value="Female Hockey Team" />
            </Picker>
          </View>

          {/* League */}
          <Text style={styles.section}>League</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={league} onValueChange={setLeague}>
              <Picker.Item label="League A" value="League A" />
              <Picker.Item label="League B" value="League B" />
              <Picker.Item label="League C" value="League C" />
            </Picker>
          </View>

          {/* Address */}
          <Text style={styles.section}>Team Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Team Contact Details"
            value={address}
            onChangeText={setAddress}
          />

          {/* Manager Details */}
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

          {/* Gender */}
          <Text style={styles.section}>Gender</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={gender} onValueChange={setGender}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>

          {/* DOB */}
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

          {/* Email */}
          <Text style={styles.section}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Create Button */}
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
              Inform the team manager to enter the code sent to their email on the app to fully set up the account before
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
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
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22396D',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: { marginTop: 15, marginBottom: 5, fontWeight: '600', color: '#22396D' },
  input: {
    backgroundColor: '#F1F1F1',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    color: '#000',
  },
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
  imageLabel: { textAlign: 'center', color: '#22396D', marginBottom: 20 },
  submitButton: {
    backgroundColor: '#22396D',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  modalTitle: { color: '#22396D', fontSize: 20, fontWeight: '700', textAlign: 'center', marginVertical: 15 },
  modalMessage: { color: '#555', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  modalButton: { marginTop: 25, backgroundColor: '#22396D', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10 },
  modalButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
