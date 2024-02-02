import firebase from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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


export const loadSound = (file, id) => {
  let url = '';
  try {
    const imageRef = ref(firebase.storage(), `songs/${id}/${file.name}`);
    return uploadBytes(imageRef, file)
      .then((snapshot) => getDownloadURL(snapshot.ref));
  } catch (e) {
    console.log('Error subiendo canción');
  }
  return url;
};

export const roundTimeMarker = (time, multiplo) => {
    const multiploInferior = Math.floor(time / multiplo) * multiplo;
    const multiploSuperior = multiploInferior + multiplo;

    return (Math.abs(time - multiploInferior) < Math.abs(time - multiploSuperior)) ? multiploInferior : multiploSuperior;
}

export const bpmToSeconds = (bpm) => (60 / bpm);

export const calculateCompas = (bpm, compas = 4) => ((60 * compas) / bpm);

export const loadTrackFromBlob = async (wavesurferInstance, trackBlob) => {
  const reader = new FileReader();
    reader.onload = async (event) => {
      let blob = new window.Blob([new Uint8Array(event.target.result)], { type: "audio/mpeg"});
      wavesurferInstance.loadBlob(blob);
    };
    reader.readAsArrayBuffer(trackBlob);
}

export const loadTrackFromString = (wavesurferInstance, track) =>  wavesurferInstance.load(track);