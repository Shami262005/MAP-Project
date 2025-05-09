// screens/Admin/ProfileScreen.js

import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  // Original values (in a real app, fetch these)
  const [original, setOriginal] = useState({
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
  });

  // Editable state
  const [username, setUsername] = useState(original.username);
  const [email, setEmail]       = useState(original.email);
  const [password, setPassword] = useState(original.password);

  const [editField, setEditField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess]   = useState(false);
  const backAfterSave = useRef(false);

  // Dirty flag
  const isDirty = (
    username !== original.username ||
    email    !== original.email    ||
    password !== original.password
  );

  // Save logic
  function doSave() {
    // TODO: call API
    setOriginal({ username, email, password });
    setShowSuccess(true);
  }

  // Close modal
  function closeModal() {
    setShowSuccess(false);
    if (backAfterSave.current) {
      navigation.goBack();
      backAfterSave.current = false;
    }
  }

  // Intercept back navigation
  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', e => {
      if (!isDirty) return;
      e.preventDefault();
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Save before leaving?',
        [
          { text: "Don't Save", style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
          { text: 'Save', onPress: () => { backAfterSave.current = true; doSave(); } },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    });
    return unsub;
  }, [navigation, isDirty]);

  const renderRow = (label, value, setter, fieldKey, secure = false) => {
    const isEditing = editField === fieldKey;
    return (
      <View style={[styles.row, isEditing && styles.rowSpacing]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{label}</Text>
          {isEditing ? (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={text => setter(text)}
                secureTextEntry={secure && !showPassword}
                autoFocus
              />
              {secure && (
                <TouchableOpacity
                  onPress={() => setShowPassword(v => !v)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <Text style={styles.value}>{secure ? '••••••••' : value}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (isEditing) {
              backAfterSave.current = true;
              doSave();
            } else {
              setEditField(fieldKey);
            }
          }}
          style={styles.iconBtn}
        >
          <Ionicons name={isEditing ? 'checkmark' : 'pencil'} size={20} color="#22396D" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safe, Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Back */}
      <TouchableOpacity onPress={() => navigation.dispatch(navigation.canGoBack() ? navigation.pop() : navigation.reset({ index: 0, routes: [] }))} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#22396D" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.heading}>Profile</Text>

      {/* Profile Card */}
      <View style={styles.card}>
        {renderRow('Username', username, setUsername, 'username')}
        {renderRow('Email',    email,    setEmail,    'email')}
        {renderRow('Password', password, setPassword, 'password', true)}
      </View>

      {/* Save Changes button */}
      {isDirty && (
        <TouchableHighlight underlayColor="#1b2f68" style={styles.saveBtn} onPress={() => { backAfterSave.current = true; doSave(); }}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableHighlight>
      )}

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={80} color="#4BB543" />
            <Text style={styles.modalTitle}>Changes Saved</Text>
            <TouchableHighlight underlayColor="#1b2f68" style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  backBtn: { marginTop: 10, marginLeft: 16, marginBottom: 8, width: 32 },
  heading: { textAlign: 'center', fontSize: 24, fontWeight: '700', color: '#22396D', marginBottom: 24 },
  card: { marginHorizontal: 16, backgroundColor: '#FFFFFF', borderRadius: 12, paddingVertical: 20, paddingHorizontal: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowSpacing: { marginTop: 20 },
  label: { fontSize: 14, color: '#888', marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '600', color: '#22396D' },
  inputWrapper: { position: 'relative' },
  input: { backgroundColor: '#F1F1F1', borderRadius: 8, padding: 8, paddingRight: 32, color: '#000' },
  eyeIcon: { position: 'absolute', right: 8, top: 10 },
  iconBtn: { marginLeft: 12 },
  saveBtn: { marginHorizontal: 16, marginTop: 24, backgroundColor: '#22396D', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center' },
  modalTitle: { marginTop: 16, fontSize: 20, fontWeight: '700', color: '#22396D' },
  modalButton: { marginTop: 24, backgroundColor: '#22396D', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8 },
  modalButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
