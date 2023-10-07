'use client';
import { useState, useContext } from "react";
import Modal from "../components/Modal";
import { createSet } from '../services/Set';
import NotificationContext from '../context/notification-context';

const CreateSet = () => {
  const { dispatchData } = useContext(NotificationContext);
  const [title, setTitle] = useState(`Set - ${(new Date()).toUTCString()}`);
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [songList, setSongList] = useState([]);
  const [auxList, setAuxList] = useState([]);

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
    try {
      await createSet({
        title,
        description,
        songList
      });
      dispatchData({ type: 'success', text: 'Set creado exitosamente' });
    } catch (e) {
      dispatchData({ type: 'error', text: 'Ocurrio un error creando el set.' });
    }
  }
  return(<>
  <section className="flex min-h-screen flex-col ml-64 p-10">
    <div className="p-4">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="flex items-start mt-4 md:mt-6 pb-5">
          <h1 className="text-5xl font-extrabold dark:text-white" onInput={(e) => setTitle(e.currentTarget.textContent)} contenteditable="true">{ title }</h1>
          <button type="button" onClick={() => saveSet()} className="ml-auto py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 12 5.419 3.871A1 1 0 0 0 16 15.057V2.943a1 1 0 0 0-1.581-.814L9 6m0 6V6m0 6H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7m-5 6h3v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm15-3a3 3 0 0 1-3 3V6a3 3 0 0 1 3 3Z"/>
            </svg>
          </button>    
        </div>
        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notas</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="message"
          rows="2"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deja tus notas del set aquí..."></textarea>
        <div className="flex items-start mt-4 md:mt-6">
          <h1 className="text-5xl font-extrabold dark:text-white">Canciones</h1>
          <button type="button" onClick={() => setIsOpen(true)} className="ml-auto py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Agregar
          </button>    
        </div>
        <div className="flex mt-4 md:mt-6 xl:gap-x-6">
          {
            (songList || []).map(({ songId, tempo, name, tonality, singer }) => (
              <div key={songId} className="w-80 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                  <button onClick={() => removeSong(songId)} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col items-center pb-10">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ name }</h5>
                  <span className="text-lg text-gray-500 dark:text-gray-400">{ singer }</span>
                  <span className="text-md text-gray-500 dark:text-gray-400">Tonalidad: { tonality }</span>
                  <span className="text-md text-gray-500 dark:text-gray-400">Tempo: { tempo } BPM</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onAdd={({ songId, ...all }) => {
        const duplicated = isDuplicated(songId);
        setIsOpen(false);
        if (duplicated) return;
        setSongList([...songList, { songId, ...all }]);
      }}
    />
    </div>
  </section>
  </>);
}

export default CreateSet;