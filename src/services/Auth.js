import { api, escalateError, getResponseData } from './index';

export async function getToken({ email, password, type }) {
  return api.post('/auth', { email, password, type })
    .then(getResponseData)
    .catch(escalateError);
}

export async function sigout() {
  return api.post('/auth/logout', null, {  headers: { 'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`} })
    .then(getResponseData)
    .catch(escalateError);
}
