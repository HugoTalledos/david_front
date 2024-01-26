import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { createSet, getSetById, updateSet } from '../services/Set';
import { getAllSongs } from "../services/Song";
import NotificationContext from '../context/notification-context';
import { Button, List, ListItem, TextArea, TextField } from "leita-components-ui";
import "./pages.css";

const CreateSet = () => {
  const { dispatchData } = useContext(NotificationContext);
  const [setId] = useState(useParams().setId);
  const [title, setTitle] = useState(`Set - ${(new Date()).toUTCString()}`);
  const [description, setDescription] = useState('');
  const [songList, setSongList] = useState([]);
  const [filterSong, setFilterSong] = useState(null);
  const [auxList, setAuxList] = useState([]);

  const [allSongs, setAllSongs] = useState([]);
  const [termValue, setTermValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (setId) {
      Promise.all([getSetById(setId)])
      .then(([resp]) => {
        const { setDescription: desc, setName: name, songConfig } = resp;
        setDescription(desc);
        setTitle(name);
        setSongList([...songConfig]);
      })
      .catch(() => dispatchData({ type: 'danger', text: 'Error consultando el set. intente mas tarde' }))
    }
    getAllSongs()
    .then((data) => setAllSongs([...data]))
    .finally(() => setLoading(false));
  }, [setId, dispatchData]);

  useEffect(() => {
    setFilterSong(allSongs.filter((current) => {
      const regex = new RegExp(termValue.toLocaleLowerCase());
      return current.songName.toLocaleLowerCase().match(regex);
    }))
  }, [termValue, allSongs]);

  const isDuplicated = (songId) => {
    if (auxList.includes(songId)) return true;

    setAuxList([...auxList, songId]);
    return false;
  };

  const removeSong = (song) => {
    setSongList(songList.filter(({ songId }) => songId !== song));
    setAuxList(auxList.filter((id) => id !== song));
  };

  const saveSet = async () => {

    const songIdList = songList.map(({ songId }) => songId);

    const body = { title, description, songList: songIdList };
    if (setId) {
      try {
        await updateSet({ setId, ...body});
        dispatchData({ type: 'success', text: 'Set actualizado exitosamente' });
        window.location.href = '/';
      } catch (e) {
        dispatchData({ type: 'error', text: 'Ocurrio un error editando el set.' });
      }
      return;
    }

    try {
      await createSet(body);
      dispatchData({ type: 'success', text: 'Set creado exitosamente' });
      window.location.href = '/';
    } catch (e) {
      dispatchData({ type: 'error', text: 'Ocurrio un error creando el set.' });
    }
  }
  return(<>
    <div className="p-4">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="flex items-start mt-4 md:mt-6 pb-5">
          <input className='invisible-textfield' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
          <button type="button" onClick={() => saveSet()} className="ml-auto py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Crear
          </button>    
        </div>
        <TextArea
          onChange={(e) => setDescription(e.target.value)}
          label="Notas"
          value={description}
        />
        <div className="song-section">
          <h1 className="text-5xl font-extrabold dark:text-white">Canciones</h1>
          <div className="songs-section__cols">
            <div className="songs-section__col">
              <TextField
                label="Buscar canción"
                value={termValue}
                onChange={(e) => setTermValue(e.target.value)}
              />
              <List loading={loading}>
                {
                  (filterSong || allSongs).map((value) => 
                  <ListItem
                    description={`${value.songName} - ${value.songTonality}`}
                    label={value.singerName}
                    onClick={() => {
                      const duplicated = isDuplicated(value.songId);
                      if (duplicated) return;
                      setSongList([...songList, { ...value }])
                    }}
                  />)
                }
              </List>
            </div>
            <section className="songs-section__col">
              {
                songList.map((value) => (
                  <details>
                    <summary>{value.songName}</summary>
                    <div>
                      <h3>Detalles de la canción:</h3>
                      <p>Cantante: {value.singerName}</p>
                      <p>Tonalidad: {value.songTonality}</p>
                      <p>Tempo: {value.songTempo}</p>
                      <a href={`/edit/song/${value.songId}`}>
                        <Button label="Editar canción" />
                      </a>
                      <Button label="Quitar canción" type="danger" onClick={() => removeSong(value.songId)}/>
                    </div>
                  </details>
                ))
              }
            </section>
          </div> 
        </div>
      </div>
    </div>
  </>);
}

export default CreateSet;