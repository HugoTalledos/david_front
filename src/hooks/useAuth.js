import firebase from '../utils/firebase';
import { getUser } from "../services/Auth";

export default function useAuth() {
  const validateUser = () => new Promise((resolve, reject) => {
    const userId = firebase.auth().currentUser.uid;
    Promise.all([
      firebase.auth().currentUser.getIdToken(),
      getUser({ userId }),
    ])
      .then(([token, user]) => {
        localStorage.setItem('us', JSON.stringify({ ...user }));
        localStorage.setItem('token', token);
        resolve('¡Bienvenido de  vuelta!');
      })
      .catch(() => reject('Usuario o contraseña incorrecta'));
  });

  const signIn = async (email, password) => Promise.all([
    firebase.auth().signInWithEmailAndPassword(email, password),
  ])
    .then(async () => validateUser()
      .then((response) => ({ success: true, message: response }))
      .catch((err) => ({ success: false, message: err })))
    .catch(() => ({ success: false, message: 'Error inesperado, intente mas tarde' }));

  const signOut = () => {
    try {
      localStorage.clear();
      firebase.auth().signOut();
      window.location.href = '/';
    } catch (e) { // an error
    }
  };

  return {
    signIn,
    signOut,
  };
}
