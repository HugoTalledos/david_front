import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import NotificationContext from '../context/notification-context';
import SingerApi from "../services/Singer";
import { markToHTML } from '../utils/Utils';
import { tonalities, tonalityTypes } from "../utils/constants";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateSong = () => {
  const [songId] = useState(useParams().songId);
  const [title, setTitle] = useState('Canción nueva');
  const [tempo, setTempo] = useState(60);
  const [tonality, setTonality] = useState('');
  const [singer, setSinger] = useState('');
  const [singerList, setSingerList] = useState([]);
  const [resource, setResource] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [chords, setChords] = useState('');
  const [configObject, setConfigObject] = useState({});

  const { dispatchData } = useContext(NotificationContext);

  
  useEffect(() => {
    Promise.all([SingerApi.getSingers()])
    .then(([resp]) => {
      setSingerList([...resp.map((singer) => singer)]);
    })
    .catch();
  }, []);

  useEffect(() => {
    if (songId) {
     /* Promise.all([getSetById(setId)])
      .then(([resp]) => {
        setConfigObject(resp);
        setAuxList(resp.songsConfig);
        setSongList(resp.songsConfig);
      })
      .catch(() => dispatchData({ type: 'danger', text: 'Error consultando el set. intente mas tarde' }))*/
    }
  }, [songId, dispatchData]);

  const saveSong = () => {

  };

  const formatLyrics = (textOriginal) => {
    setChords(textOriginal)
    const textoLimpio = textOriginal.replace(/<p><u>.*?<\/u><\/p>/g, '');
    setLyrics(textoLimpio);
  };

  return(<>
    <section className="flex min-h-screen flex-col ml-64 p-10">
      <div className="p-4">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex items-start mt-4 md:mt-6 pb-5">
            <h1 className="text-5xl font-extrabold dark:text-white" onInput={(e) => setTitle(e.currentTarget.textContent)} contenteditable="true">{ configObject.setName || title }</h1>
            <button type="button" onClick={() => saveSong()} className="ml-auto py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 12 5.419 3.871A1 1 0 0 0 16 15.057V2.943a1 1 0 0 0-1.581-.814L9 6m0 6V6m0 6H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7m-5 6h3v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm15-3a3 3 0 0 1-3 3V6a3 3 0 0 1 3 3Z"/>
              </svg>
            </button>    
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label for="tempo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">BPM</label>
              <input type="number"
                     min={60}
                     value={tempo}
                     onChange={(e) => setTempo(e.target.value)}
                     id="tempo"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="120" required />
            </div>
            <div>
                <label for="tonality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tonalidad</label>
                <select id="tonality" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  { tonalities.map((ton) => (<option value={ton}>{ ton }</option>)) }
                </select>
                <select id="tonality" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected> </option>
                  { tonalityTypes.map((ton) => (<option value={ton}>{ ton }</option>)) }
                </select>
            </div>
            <div>
              <label for="singer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantante</label>
              <select id="Singer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Selecciona un cantante</option>
                {
                  (singerList || singerList.length > 0)
                  && singerList.map(({ singerId, singerName }) => (
                    <option value={singerId}>{ singerName }</option>
                  ))

                }
              </select>
            </div>  
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label for="resource" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link ejemplo</label>
              <input type="text"
                     value={resource}
                     onChange={(e) => setResource(e.target.value)}
                     id="resource"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="http://youtube.com" required />
            </div> 
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
              <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
            </div>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label for="chords" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Letra con acordes</label>
              <ReactQuill theme="snow" value={chords} onChange={(e) => formatLyrics(e)} />
            </div>
            <div>
              <label for="chords" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Letra</label>
              <p className="mb-3 text-gray-500 dark:text-gray-400"
                 dangerouslySetInnerHTML={{ __html: markToHTML(lyrics) }}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>);
}

export default CreateSong;
