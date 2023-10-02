import axios from 'axios';

import { REACT_APP_API_URL } from '../config';

export const api = axios.create({
  baseURL: REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getApiURL = () => REACT_APP_API_URL;
export const getResponseData = (resp) => resp.data.data;

export const escalateError = (err) => {
  let errorFromResponse;
  try {
    errorFromResponse = err.response.data.error.toString();
  } catch (e) {
    errorFromResponse = undefined;
  }
  const newErr = new Error(errorFromResponse
    || (err instanceof Error
      ? err.message || err.toString()
      : typeof err === 'string'
        ? err
        : err.toString() || 'Error Inesperado'));
  try {
    newErr.data = err.response.data;
  } catch (e) {
    // console.error(e);
  }
  throw newErr;
};

export default api;
