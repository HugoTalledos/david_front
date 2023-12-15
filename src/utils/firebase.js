import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// eslint-disable-next-line
import firebaseConfig from './firebase-config.json';

firebase.initializeApp(firebaseConfig);

export default firebase;
