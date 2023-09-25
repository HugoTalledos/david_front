import { REACT_APP_API_URL } from '../config';
const url = `${REACT_APP_API_URL}/sets`;

export async function getSets() {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Something went wrong');
  const { data } = await res.json();
  return data;
}

export async function getSetById(setId) {
  const res = await fetch(`${url}/${setId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Something went wrong');
  const { data } = await res.json();
  return data;
}

export async function createSet({ title, description, songList }) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ setName: title, setDescription: description, songList }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Something went wrong');
  const { data } = await res.json();
  return data;
}