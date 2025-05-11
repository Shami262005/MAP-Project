import { API } from './client';

export const listAnnouncements  = () => API.get('/announcements').then(r => r.data);
export const createAnnouncement = ann => API.post('/announcements', ann).then(r => r.data);
export const getAnnouncement    = id => API.get(`/announcements/${id}`).then(r => r.data);
export const deleteAnnouncement = id => API.delete(`/announcements/${id}`);
