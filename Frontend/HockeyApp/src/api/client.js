import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://192.168.178.56:8080',  // ← replace with your back-end URL
  timeout: 5000,
});

