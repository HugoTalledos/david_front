import firebase from "../utils/firebase";
import { list, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { mdToHTML } from "./snarkdown";

export const markToHTML = (data) => mdToHTML(data);

export const readBuffer = async (file) => new Promise(
  (resolve, reject) => {
    const readerBuffer = new FileReader();
    readerBuffer.onload = () => {
      resolve(readerBuffer.result);
    };
    readerBuffer.onerror = reject;
    readerBuffer.readAsArrayBuffer(file);
  },
);

export const sessionConfig = () => {
  const user = JSON.parse(localStorage.getItem('us'));
  const token = localStorage.getItem('token');

  return {
    ...user,
    token,
  };
};


export const loadSound = (file) => {
  let url = '';
  try {
    const imageRef = ref(firebase.storage(), `songs/${file.name}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => getDownloadURL(snapshot.ref));
  } catch (e) {
    console.log('Error subiendo canción');
  }
  return url;
};