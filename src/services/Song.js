import { REACT_APP_API_URL } from '../config';
const url = `${REACT_APP_API_URL}/songs`;

export async function findSong(songName) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ songName }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Something went wrong');
  const { data } = await res.json();
  return data;
}