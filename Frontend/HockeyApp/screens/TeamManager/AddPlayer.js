import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';


export default function AddPlayer({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAdd = () => {
    setShowSuccess(true);
  };

  const closeModal = () => {
    setShowSuccess(false);
    navigation.navigate('Team');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      <View style={styles.container}>
        <Text style={styles.header}>Add Player</Text>
        <TextInput placeholder="First Name" style={styles.input} value={firstName} onChangeText={setFirstName} />
        <TextInput placeholder="Last Name" style={styles.input} value={lastName} onChangeText={setLastName} />
        <TextInput placeholder="Gender" style={styles.input} value={gender} onChangeText={setGender} />
        <TextInput placeholder="Age" keyboardType="numeric" style={styles.input} value={age} onChangeText={setAge} />
        <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} value={email} onChangeText={setEmail} />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

        <Modal visible={showSuccess} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.popup}>
              <Image source={require('../../assets/logo.png')} style={styles.icon} />
              <Text style={styles.title}>Player Successfully Created</Text>
              <Text style={styles.note}>
                Inform the player to enter the code sent to their email on the app to fully set up the account before use.
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#1e3b74', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: '#1e3b74', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  popup: { backgroundColor: '#fff', padding: 30, borderRadius: 10, alignItems: 'center', width: '85%' },
  icon: { width: 70, height: 70, marginBottom: 15 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e3b74', textAlign: 'center', marginBottom: 10 },
  note: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 20 },
  modalButton: { backgroundColor: '#1e3b74', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6 },
  modalButtonText: { color: '#fff', fontSize: 16 },
  bottomNav: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: '#fff', paddingVertical: 10, borderTopColor: '#ddd', borderTopWidth: 1
  },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 12, color: '#666', marginTop: 2 }
});