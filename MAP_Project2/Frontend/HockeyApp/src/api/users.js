import { API } from './client';

export const listUsers  = () => API.get('/users').then(r => r.data);
export const deleteUser = id => API.delete(`/users/${id}`);
export const getUser    = id => API.get(`/users/${id}`).then(r => r.data);
