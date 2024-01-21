import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Buffer } from 'buffer';
import NotificationContext from '../context/notification-context';
import SingerApi from "../services/Singer";
import { createSong, updateSong, getSongById } from "../services/Song";
import { loadSound, markToHTML, readBuffer } from '../utils/Utils';
import { tonalities, tonalityTypes } from "../utils/constants";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Select, TextField } from "leita-components-ui";

const CreateSong = () => {
  const [songId] = useState(useParams().songId);
  const [title, setTitle] = useState('Canción nueva');
  const [tempo, setTempo] = useState(60);
  const [tonality, setTonality] = useState('');
  const [complement, setComplement] = useState('');
  const [singer, setSinger] = useState('');
  const [singerList, setSingerList] = useState([]);
  const [resource, setResource] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [chords, setChords] = useState('');
  const [multitrack, setMultitrack] = useState('');
  const [loading, setLoading]  =useState(false);

  const { dispatchData } = useContext(NotificationContext);

  
  useEffect(() => {
    Promise.all([SingerApi.getSingers()])
    .then(([resp]) => {
      setSingerList([...resp.map((singer) => singer)]);
    })
    .catch(() => dispatchData({ type: 'danger', text: 'Error consultando el set. intente mas tarde' }));
  }, [dispatchData]);

  useEffect(() => {
    if (songId) {
      Promise.all([getSongById(songId)])
      .then(([{
        songName, songTempo, songTonality,
        singerId, songResource, songChords }]) => {
        const regexTon = new RegExp(`[${tonalities.toString()}]`);
        const regexComp = new RegExp(`[${tonalityTypes.toString()}]`);
        const [, comple] = songTonality.split(regexTon);
        const [ton] = songTonality.split(regexComp);
        setTitle(songName);
        setTempo(songTempo);
        setResource(songResource);
        setChords(songChords);
        setSinger(singerId);
        setTonality(ton);
        setComplement(comple);
      })
      .catch(() => dispatchData({ type: 'danger', text: 'Error consultando el set. intente mas tarde' }))
    }
  }, [songId, dispatchData]);

  const saveSong = async () => {
    setLoading(true);
    const [{singerId, singerName}] = singerList.filter((current) => current.singerId === singer);    
    const url = await loadSound(multitrack);

    const body =  {
      songId,
      songName: title,
      singerId,
      singerName,
      songTempo: tempo,
      songTonality: `${tonality}${complement}`,
      songResource: resource,
      songLyrics: lyrics,
      songChords:chords,
      secuence: [url]
    }

    let promise = songId ? updateSong(body) : createSong(body);

    return Promise.all([promise])
    .then(([resp]) => {
      dispatchData({ type: 'success', text: 'Canción creada exitosamente' })
      setTitle('Nueva canción');
      setTempo(60);
      setTonality('');
      setComplement('');
      setSinger('');
      setResource('');
      setLyrics('');
      setChords('');
      setMultitrack('');
    })
    .catch(() =>dispatchData({ type: 'danger', text: 'Ocurrio un error, por favor intenta más tarde.' }))
    .finally(() => setLoading(false));

  };
  
  /* const readFileAsync = async (file) => {
    const buffer = await readBuffer(file);
    const uint8View = new Uint8Array(buffer);
    return Buffer.from(uint8View);
  };*/ 

  const loadMultitrack = async (e) => {
    const { files = [] } = e.target;
    setMultitrack(files[0]);
  }

  const formatLyrics = (textOriginal) => {
    setChords(textOriginal)
    const textoLimpio = textOriginal.replace(/<p><u>.*?<\/u><\/p>/g, '');
    setLyrics(textoLimpio);
  };

  return(<>
      <div className="p-4">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex items-center mt-4 md:mt-6 pb-5">
            <input className='invisible-textfield' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <Button
              loading={loading}
              onClick={() => saveSong()}
              icon='check'
              label='Guardar'
              type="dark-outline"
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <TextField
              label="BPM"
              onChange={(e) => setTempo(e.target.value)}
              type="number"
              value={tempo}
            />
            <div>
                <Select
                  onChange={(e) => setTonality(e.target.value)}
                  disabled={loading}
                  label="Tonalidad"
                  value={tonality}
                  options={[
                    { value: null, label: '--Selecciona una nota --'},
                    ...tonalities.map((ton) => ({ value: ton, label: ton }))
                  ]}
                />

                <Select
                  disabled={loading}
                  onChange={(e) => setComplement(e.target.value)}
                  label="Alteración"
                  options={[
                    { value: null, label: ''},
                    ...tonalityTypes.map((ton) => ({ value: ton, label: ton }))
                  ]}
                  value={complement}
                />
            </div>
            <Select
              onChange={(e) => setSinger(e.target.value)}
              label="Cantante"
              options={
                [
                  { value: null, label: 'Selecciona un cantante' },
                  ...singerList.map(({singerId, singerName}) => ({ value: singerId, label: singerName }))
                ]}
              value={singer}
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label for="resource" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link ejemplo</label>
              <input type="text"
                     value={resource}
                     disabled={loading}
                     onChange={(e) => setResource(e.target.value)}
                     id="resource"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="http://youtube.com" required />
            </div> 
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
              <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                     id="file_input"
                     type="file"
                     disabled={loading}
                     accept="audio/*"
                     onChange={(e) => loadMultitrack(e)}
                     multiple={false}/>
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
  </>);
}

export default CreateSong;
