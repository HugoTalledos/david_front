import { useEffect, useState, useContext } from "react";
import NotificationContext from '../context/notification-context';
import { getAllSongs, deleteSongById } from "../services/Song";

const ViewSongs = () => {
  const [songList, setSongList] = useState([]);

  const { dispatchData } = useContext(NotificationContext);

  useEffect(() => {
    Promise.all([getAllSongs()])
    .then(([resp]) =>  setSongList([...resp.map((song) => song)]))
    .catch(() => dispatchData({ type: 'danger', text: 'Error obteniendo canciones. Intente mas tarde' }))
  }, []);

  const deleteSong = async (songId, status) => {
    try {
      const resp = await deleteSongById(songId, !status);
      setSongList((songFilter) => [...songFilter].map((t) => {
        if (t.songId === songId) return ({ ...resp, status: !status });
        return t;
      }));
      dispatchData({ type: 'success', text: 'El estado de la canción cambio exitosamente.' })
    } catch (error) {
      dispatchData({ type: 'danger', text: 'Error eliminando canción. Intente mas tarde' })
    }
  };

  return(<>
      <div className="p-4">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex items-start mt-4 md:mt-6 pb-5">
            <h1 className="text-5xl font-extrabold dark:text-white" >Canciones</h1>
            <a href='/create/song' className="ml-auto py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
              </svg>
            </a>    
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-1">
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Nombre canción</th>
                      <th scope="col" className="px-6 py-3">Nombre del cantante</th>
                      <th scope="col" className="px-6 py-3">Estado</th>
                      <th scope="col" className="px-6 py-3">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      songList.map(({ songId, songName, singerName, status }) => (
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            { songName }
                          </th>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            { singerName }
                          </th>
                          <td className="px-6 py-4">{ status ? 'Activa': 'Eliminada'}</td>
                          <td className="px-6 py-4">
                            <a href={`/edit/song/${songId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-5">Editar</a>
                            <button
                              onClick={() => deleteSong(songId, status)} 
                              className="font-mediumtext-blue-600 dark:text-blue-500 hover:underline">Eliminar</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>);
}

export default ViewSongs;