import { api, escalateError, getResponseData } from './index';

export async function getUser({ userId }) {
  return api.post('/auth', { userId })
    .then(getResponseData)
    .catch(escalateError);
}

export async function sigout() {
  return api.post('/auth/logout', {}, {  headers: { 'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`} })
    .then(getResponseData)
    .catch(escalateError);
}
