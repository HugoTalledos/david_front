import { api, escalateError, getResponseData } from './index';

export async function findSong(songName) {
  return api.post('/songs', { songName })
    .then(getResponseData)
    .catch(escalateError);
}