import { api, escalateError, getResponseData } from './index';

export async function createSong(body) {
  return api.post('/songs', body)
    .then(getResponseData)
    .catch(escalateError);
}

export async function findSong(songName) {
  return api.post('/songs/a', { songName })
    .then(getResponseData)
    .catch(escalateError);
}