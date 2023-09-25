import { REACT_APP_API_URL } from '../config';
const url = `${REACT_APP_API_URL}/auth`;

export async function getToken({ email, password, type }) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ email, password, type }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Something went wrong');
  const { data } = await res.json();
  return data;
}
