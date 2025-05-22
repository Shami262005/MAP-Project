import { API } from './client';

export const listTeams  = () => API.get('/teams').then(r => r.data);
export const createTeam = team => API.post('/teams', team).then(r => r.data);
export const getTeam    = id   => API.get(`/teams/${id}`).then(r => r.data);
export const getTeamDetails = id   => API.get(`/teams/${id}/details`).then(r => r.data);
export const updateTeam = (id, data) => API.put(`/teams/${id}`, data).then(r => r.data);
export const deleteTeam = id   => API.delete(`/teams/${id}`);
export const addPlayer     = (teamId, data) => API.post(`/teams/${teamId}/players`, data).then(r => r.data);
export const removePlayer  = (teamId, playerId) => API.delete(`/teams/${teamId}/players/${playerId}`).then(r => r.data);