// screens/Common/CreateCredentialsScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { referralSignup } from '../../src/api/auth';

export default function CreateCredentialsScreen({ navigation }) {
  const [username, setUsername]       = useState('');
  const [password, setPassword]       = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);

  const [errorVisible, setErrorVisible]   = useState(false);
  const [errorMessage, setErrorMessage]   = useState('');
  const [successVisible, setSuccessVisible] = useState(false);

  const showError = msg => {
    setErrorMessage(msg);
    setErrorVisible(true);
  };

  const handleSignup = async () => {
    // client-side constraints
    if (username.length < 5) {
      return showError('Username must be at least 5 characters.');
    }
    if (password.length < 8) {
      return showError('Password must be at least 8 characters.');
    }
    if (password !== confirmPassword) {
      return showError('Passwords must match.');
    }

    try {
      await referralSignup({ username, password });
      setSuccessVisible(true);
    } catch (e) {
      const err = e.response?.data?.error || e.message || 'Signup failed';
      if (err.toLowerCase().includes('username')) {
        showError('That username is already taken.');
      } else {
        showError(err);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/HockeyWallpaper.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.avoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.title}>Set Up Your Account</Text>

            <TextInput
              style={[styles.input, { marginBottom: 17 }]}
              placeholder="Username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color="#22396D"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowConfirm(!showConfirm)}
              >
                <Ionicons
                  name={showConfirm ? 'eye-off' : 'eye'}
                  size={22}
                  color="#22396D"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={successVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setSuccessVisible(false);
          navigation.replace('Login');
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={80} color="#4BB543" />
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalMessage}>
              Your account has been set up. Please log in.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setSuccessVisible(false);
                navigation.replace('Login');
              }}
            >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  avoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22396D',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    backgroundColor: '#F1F1F1',
    padding: 12,
    borderRadius: 10,
    color: '#000',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 15,
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    right: 15,
    top: 14,
  },
  button: {
    backgroundColor: '#22396D',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  /* Modal */
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
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    color: '#22396D',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#22396D',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
