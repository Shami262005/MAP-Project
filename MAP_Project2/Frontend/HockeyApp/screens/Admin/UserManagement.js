// screens/Admin/UserManagementScreen.js

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listUsers, deleteUser, getUser } from '../../src/api/users';

export default function UserManagementScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [detail, setDetail] = useState(null);

  // New state for delete-success modal
  const [deleteSuccessVisible, setDeleteSuccessVisible] = useState(false);
  const [justDeletedName, setJustDeletedName] = useState('');

  // Fetch all users
  useEffect(() => {
    (async () => {
      try {
        const all = await listUsers();
        setUsers(all);
      } catch (e) {
        Alert.alert('Error', 'Failed to load users.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filtered list
  const filtered = users.filter(u =>
    (`${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase())) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Delete handler
  const handleDelete = id => {
    Alert.alert('Confirm', 'Are you sure you want to delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          try {
            // capture name
            const user = users.find(u => u.user_id === id);
            await deleteUser(id);
            setUsers(users.filter(u => u.user_id !== id));
            // show success modal
            setJustDeletedName(`${user.first_name} ${user.last_name}`);
            setDeleteSuccessVisible(true);
          } catch {
            Alert.alert('Error', 'Could not delete user.');
          }
        }
      }
    ]);
  };

  // View details
  const openDetails = async id => {
    setLoading(true);
    try {
      const u = await getUser(id);
      setDetail(u);
      setModalVisible(true);
    } catch {
      Alert.alert('Error', 'Could not fetch user details.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor="#E5E9F4"
      style={styles.cardWrapper}
      onPress={() => openDetails(item.user_id)}
    >
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.name}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleDelete(item.user_id)}>
            <Ionicons name="trash" size={22} color="#D32F2F" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openDetails(item.user_id)}
            style={styles.eyeBtn}
          >
            <Ionicons name="eye" size={22} color="#22396D" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22396D" />
      </View>
    );
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView
        style={[
          styles.safe,
          Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight },
        ]}
      >
        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#22396D" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.heading}>User Management</Text>

        {/* Search */}
        <View style={styles.search}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* List */}
        <FlatList
          data={filtered}
          keyExtractor={u => String(u.user_id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.empty}>No users found.</Text>}
        />
      </SafeAreaView>

      {/* Details Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {detail ? (
              <>
                <Text style={styles.modalTitle}>
                  {detail.first_name} {detail.last_name}
                </Text>
                <Text>Email: {detail.email}</Text>
                <Text>Phone: {detail.phone}</Text>
                <Text>Role: {detail.user_role}</Text>
                {detail.team_name
                  ? <Text>Team: {detail.team_name}</Text>
                  : <Text>No team assigned</Text>
                }
                {detail.gender && <Text>Gender: {detail.gender}</Text>}
                {detail.dob && (
                  <Text>
                    DOB: {new Date(detail.dob).toLocaleDateString()}
                  </Text>
                )}
              </>
            ) : (
              <ActivityIndicator size="large" color="#22396D" />
            )}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Success Modal */}
      <Modal
        visible={deleteSuccessVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteSuccessVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={100} color="#4BB543" style={{ alignSelf: 'center', marginBottom: 12 }} />
            <Text style={styles.modalTitle}>
              {justDeletedName} was deleted
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setDeleteSuccessVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  backBtn: { marginTop: 10, marginLeft: 16, marginBottom: 8, width: 32 },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#22396D',
    marginBottom: 24,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: { marginLeft: 8, flex: 1, fontSize: 16, color: '#000' },
  cardWrapper: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  info: { flex: 1 },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22396D',
  },
  email: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: { marginLeft: 12 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },

  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#22396D',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#22396D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
