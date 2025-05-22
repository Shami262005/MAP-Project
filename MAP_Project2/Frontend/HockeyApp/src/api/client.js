// src/api/client.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API = axios.create({
  baseURL: 'http://192.168.178.56:5001', // adjust if your backend host/port differs
});

// Automatically attach JWT from storage to every request
API.interceptors.request.use(async config => {
  if (!config.headers.Authorization) {                     // ← only if none
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
