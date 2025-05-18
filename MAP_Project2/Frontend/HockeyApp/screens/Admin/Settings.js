// screens/Admin/SettingsScreen.js

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView
        style={[
          styles.safe,
          Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight },
        ]}
      >
        {/* Back Button */}
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#22396D" />
        </TouchableHighlight>

        {/* Title */}
        <Text style={styles.heading}>Settings</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {/* My Profile */}
          <TouchableHighlight
            underlayColor="#E5E9F4"
            style={styles.cardWrapper}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.card}>
              <Ionicons name="person-circle-outline" size={28} color="#22396D" />
              <Text style={styles.cardText}>My Profile</Text>
            </View>
          </TouchableHighlight>

          {/* User Management */}
          <TouchableHighlight
            underlayColor="#E5E9F4"
            style={styles.cardWrapper}
            onPress={() => navigation.navigate('UserManagement')}
          >
            <View style={styles.card}>
              <FontAwesome5 name="users" size={28} color="#22396D" />
              <Text style={styles.cardText}>User Management</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    marginTop: 10,
    marginLeft: 16,
    marginBottom: 8,
    width: 32,
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#22396D',
    marginBottom: 24,
  },
  optionsContainer: {
    paddingHorizontal: 16,
  },
  cardWrapper: {
    borderRadius: 12,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#22396D',
  },
});
