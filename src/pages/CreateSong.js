import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import NotificationContext from '../context/notification-context';
import SingerApi from "../services/Singer";
import { createSong, updateSong, getSongById } from "../services/Song";
import { loadSound, markToHTML } from '../utils/Utils';
import { tonalities, tonalityTypes } from "../utils/constants";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Select, TextField } from "leita-components-ui";
import { v4 } from "uuid";

const CreateSong = () => {
  const [songId] = useState(useParams().songId);
  const [title, setTitle] = useState('Canción nueva');
  const [tempo, setTempo] = useState(60);
  const [tonality, setTonality] = useState('');
  const [complement, setComplement] = useState('');
  const [singer, setSinger] = useState('');
  const [singerList, setSingerList] = useState([]);
  const [resource, setResource] = useState('');
  const [resources, setResources] = useState([]);
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
        setResources(songResource);
        setChords(songChords);
        setSinger(singerId);
        setTonality(ton);
        setComplement(comple);
      })
      .catch(() => dispatchData({ type: 'danger', text: 'Error consultando el set. intente mas tarde' }))
    }
  }, [songId, dispatchData]);

  const saveSong = async (songId) => {
    setLoading(true);
    const [{singerId, singerName}] = singerList.filter((current) => current.singerId === singer);
    const newSongId = songId || v4();
    const url = await loadSound(multitrack, newSongId);

    const body =  {
      songId: newSongId,
      songName: title,
      singerId,
      singerName,
      songTempo: tempo,
      songTonality: `${tonality}${complement}`,
      songResources: resources,
      songLyrics: lyrics,
      songChords:chords,
      secuence: [url]
    }

    let promise = songId ? updateSong(body) : createSong(body);

    return Promise.all([promise])
    .then(() => {
      dispatchData({ type: 'success', text: 'Canción creada exitosamente' })
      setTitle('Nueva canción');
      setTempo(60);
      setTonality('');
      setComplement('');
      setSinger('');
      setResource('')
      setResources([]);
      setLyrics('');
      setChords('');
      setMultitrack('');
    })
    .catch(() =>dispatchData({ type: 'danger', text: 'Ocurrio un error, por favor intenta más tarde.' }))
    .finally(() => setLoading(false));

  };

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
      <div className="p-4 h-full overflow-auto">
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
        <section className="flex flex-row gap-4 w-full pb-5">
          <div className="flex flex-col w-full gap-3 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Secuencia</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              disabled={loading}
              accept="audio/*"
              onChange={(e) => loadMultitrack(e)}
              multiple={false}/>
            <Select
              onChange={(e) => setSinger(e.target.value)}
              disabled={loading}
              label="Cantante"
              options={
                [
                  { value: null, label: 'Selecciona un cantante' },
                  ...singerList.map(({singerId, singerName}) => ({ value: singerId, label: singerName }))
                ]}
              value={singer}
            />
            <TextField
              label="BPM"
              onChange={(e) => setTempo(e.target.value)}
              type="number"
              value={tempo}
              disabled={loading}
            />
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
          <div className="flex flex-col w-full gap-3 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="flex items-center gap-2">
              <TextField
                label="Referencia"
                value={resource}
                disabled={loading}
                onChange={(e) => setResource(e.target.value)}
                type="text"
              />
              <Button
                disabled={loading}
                onClick={() => {
                  setResource('');
                  setResources((prev) => [...prev, resource])
                }}
                icon='check'
                label='Agregar'
                type="dark-outline"
              />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4"> # </th>
                    <th scope="col" className="px-6 py-3">Link</th>
                    <th scope="col" className="px-6 py-3">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    resources.map((resource, idx) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4"> {idx + 1}</td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white">
                          { resource }
                        </th>
                        <td className="flex items-center px-6 py-4">
                          <Button
                            type="link"
                            label="Quitar"
                            onClick={() => setResources([...resources.filter((r) => r !== resource)])}
                          />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
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
