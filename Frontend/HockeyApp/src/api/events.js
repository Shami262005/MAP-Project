import { API } from './client';

export const listEvents  = () => API.get('/events').then(r => r.data);
export const createEvent = ev => API.post('/events', ev).then(r => r.data);
export const getEvent    = id => API.get(`/events/${id}`).then(r => r.data);
export const updateEvent = (id, ev) => API.put(`/events/${id}`, ev).then(r => r.data);
export const deleteEvent = id => API.delete(`/events/${id}`);
