import { api, escalateError, getResponseData } from './index';

export async function createSong(body) {
  return api.post('/songs', body)
    .then(getResponseData)
    .catch(escalateError);
}

export async function updateSong(body) {
  return api.put('/songs', body)
    .then(getResponseData)
    .catch(escalateError);
}

export async function findSong(songName) {
  return api.post('/songs/a', { songName })
    .then(getResponseData)
    .catch(escalateError);
}

export async function getAllSongs() {
  return api.post('/songs/all', { limit: 20, orderKey: 'songName', order: 'asc' })
    .then(getResponseData)
    .catch(escalateError);
}

export async function getSongById(songId) {
  return api.get(`/songs/${songId}`)
    .then(getResponseData)
    .catch(escalateError);
}

export async function deleteSongById(songId, status) {
  return api.post('/songs/change-status', { songId, status })
    .then(getResponseData)
    .catch(escalateError);
}