import { api, escalateError, getResponseData } from './index';

export async function getSets() {
  return api.get('/sets')
    .then(getResponseData)
    .catch(escalateError);
}

export async function getSetById(setId) {
  return api.get(`/sets/${setId}`)
    .then(getResponseData)
    .catch(escalateError);
}

export async function createSet({ title, description, songList }) {
  return api.post('/sets', { setName: title, setDescription: description, songList })
    .then(getResponseData)
    .catch(escalateError);
}

export async function updateSet({ setId, title, description, songList }) {
  return api.put('/sets', { setId, setName: title, setDescription: description, songList })
    .then(getResponseData)
    .catch(escalateError);
}

export async function deleteSet({ setId }) {
  return api.delete(`/sets/${setId}`)
    .then(getResponseData)
    .catch(escalateError)
}