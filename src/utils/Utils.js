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