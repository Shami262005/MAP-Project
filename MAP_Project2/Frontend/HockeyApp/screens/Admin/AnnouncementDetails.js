// screens/Admin/AnnouncementDetails.js

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { deleteAnnouncement } from '../../src/api/announcments';

export default function AnnouncementDetailsScreen({ navigation, route }) {
  const announcement = route.params.announcement;
  const {
    image_url,
    heading,
    description,
    published_at,
    announcement_id,
  } = announcement;

  const formattedDate = published_at
    ? new Date(published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const onPressDelete = () => setConfirmVisible(true);

  const handleConfirmDelete = async () => {
    setConfirmVisible(false);
    setLoadingDelete(true);
    try {
      await deleteAnnouncement(announcement_id);
      setSuccessVisible(true);
    } catch (err) {
      console.error('Delete failed', err);
    } finally {
      setLoadingDelete(false);
    }
  };

  const closeSuccess = () => {
    setSuccessVisible(false);
    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <SafeAreaView
        style={[styles.safe, Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight } ]}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#22396D" />
          </TouchableOpacity>

          {image_url ? (
            <Image source={{ uri: image_url }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}

          <Text style={styles.title}>{heading}</Text>

          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{description}</Text>

          <Text style={styles.published}>Published: {formattedDate}</Text>

          <TouchableOpacity style={styles.deleteBtn} onPress={onPressDelete}>
            <Text style={styles.deleteText}>Delete Announcement</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      {/* Confirmation Modal */}
      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="help-circle" size={70} color="#22396D" />
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete this announcement?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setConfirmVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FontAwesome name="check-circle" size={70} color="#4BB543" />
            <Text style={styles.modalTitle}>Deleted Successfully</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={closeSuccess}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Loading Overlay */}
      {loadingDelete && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#22396D" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  backBtn: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#ddd',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22396D',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  published: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
  },
  deleteBtn: {
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Confirm modal
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
    color: '#22396D',
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  cancelText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
  },

  // Success modal OK button
  okButton: {
    backgroundColor: '#22396D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
