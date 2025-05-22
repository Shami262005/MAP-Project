// src/api/auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from './client';

// 1) Normal login
export async function login({ username, password }) {
  const res = await API.post('/auth/login', { username, password });
  const {
    token,
    user_role,
    user_id,
    first_name,
    last_name,
    team_id
  } = res.data;

  // persist for later API calls & screens
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('user_role', user_role);
  await AsyncStorage.setItem('user_id', String(user_id));
  await AsyncStorage.setItem('first_name', first_name);
  await AsyncStorage.setItem('last_name', last_name);
  // only set team_id if it exists (admins may have null)
  if (team_id != null) {
    await AsyncStorage.setItem('team_id', String(team_id));
  }
  return res.data;
}

// 2) Logout
export async function logout() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user_role');
}

// 3) Verify referral PIN (Step 1)
export async function verifyReferral(pin_code) {
  const res = await API.post('/auth/referral/verify', { pin_code });
  const { referralToken } = res.data;
  await AsyncStorage.setItem('referralToken', referralToken);
  return referralToken;
}

// 4) Complete signup (Step 2)
export async function referralSignup({ username, password }) {
  const token = await AsyncStorage.getItem('referralToken');
  if (!token) throw new Error('No referral token found');
  const res = await API.post(
    '/auth/referral/signup',
    { username, password },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  await AsyncStorage.removeItem('referralToken');
  return res.data;
}
