import { API } from './client';

export const listTeams  = () => API.get('/teams').then(r => r.data);
export const createTeam = team => API.post('/teams', team).then(r => r.data);
export const getTeam    = id   => API.get(`/teams/${id}`).then(r => r.data);
export const updateTeam = (id, data) => API.put(`/teams/${id}`, data).then(r => r.data);
export const deleteTeam = id   => API.delete(`/teams/${id}`);
