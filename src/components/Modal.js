import { useState } from "react";
import { findSong  } from '../services/Song';

const Modal = ({ isOpen, onClose, onAdd }) => {
  const [songId, setSongId] = useState('');
  const [tonality, setTonality] = useState('');
  const [tempo, setTempo] = useState(120);
  const [resource, setResource] = useState('');
  const [singer, setSinger] = useState('');
  const [name, setName] = useState('');

  const searchSong = async (text) => {
    const term = text.split(' ');
    if (term.length <= 1) return;

    try {
      const [song] = await findSong(text);
      const { resource, singer, songName, tempo, tonality, songId } = song;
      setTonality(tonality);
      setTempo(tempo);
      setResource(resource);
      setSinger(singer);
      setName(songName);
      setSongId(songId);
    } catch (e) {
      console.log(e);
    }
  };

  return (<>
  <div id="authentication-modal" tabindex="-1" aria-hidden="true" className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${!isOpen ? 'hidden' : ''}`}>
    <div className="relative w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button onClick={onClose} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Agrega una nueva canción</h3>
          <form className="space-y-6" action="#">
            <div>
              <label for="search" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Canción</label>
              <input onChange={(e) => searchSong(e.target.value)}
                     type="text"
                     name="search"
                     id="search"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                     placeholder="Ingresa las primeras tres letras"  />
            </div>
            <p class="text-gray-500 dark:text-gray-400">Canción: { name }</p>
            <p class="text-gray-500 dark:text-gray-400">Cantante: { singer }</p>
            <div>
              <label for="tonality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tonalidad</label>
              <input 
                     minLength={1}
                     maxLength={3}
                     onChange={(e) => setTonality(e.target.value)}
                     value={tonality}
                     type="text"
                     name="tonality"
                     id="tonality"
                     placeholder="Am"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
            </div>
            <div>
              <label for="bpm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tempo</label>
              <input
                min={1}
                onChange={(e) => setTempo(e.target.value)}
                value={tempo}
                type="number"
                name="bpm"
                id="bpm"
                placeholder="150"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
            </div>
            <div>
              <label for="resource" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nueva Referencia?</label>
              <input 
                     value={resource}
                     onChange={(e) => setResource(e.target.value)}
                     type="text"
                     name="resource"
                     id="resource"
                     placeholder="www.youtube.com"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
            </div>

            <button 
                    onClick={(e) => {
                      e.preventDefault();
                      return onAdd({
                        songId,
                        name,
                        singer,
                        tempo,
                        tonality,
                        resource
                      });
                    }}
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                ¿No encuentras tu canción? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Crear canción</a>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div> 
  {isOpen && (<div modal-backdrop="" class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>)}
</>);
}

export default Modal;