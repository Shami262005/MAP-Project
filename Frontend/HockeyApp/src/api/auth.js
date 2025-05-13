// auth.js
import { API } from './client';

// Login (no tokens; you get back a user payload & role)
export function login({ username, password }) {
  return API
    .post('/Admin/Login', { username, password })   // ← match your AdminController mapping
    .then(r => r.data);  // e.g. { id, username, role, … }
}
