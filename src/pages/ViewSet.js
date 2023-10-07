import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getSetById } from "../services/Set";
import NotificationContext from '../context/notification-context';

import Song from "../components/Song";

const ViewSet = () => {
  const { dispatchData } = useContext(NotificationContext);
  const [setId] = useState(useParams().setId);
  const [group, setGroup] = useState({});
  const [config, setConfig] = useState(null);
  const [selectedSong, setSelectedSong] = useState('');
  const [songsConfig, setSongsConfig] = useState([]);
  
  useEffect(() => {
    Promise.all([getSetById(setId)])
    .then(([{ songsConfig, ...all }]) =>{
      setGroup({ songsConfig, ...all });
      setSongsConfig(songsConfig);
    })
    .catch((e) => dispatchData({ type: 'danger', text: 'Ocurrio un error, por favor intenta más tarde.' }));
  }, [setId]);

  const selectSong = (configId) => {
    const config = (songsConfig.find((song) => song.configId === configId) || {});
    setConfig(config);
    setSelectedSong(configId);
  }

  return (<>
    <section className="min-h-screen ml-64 p-10">
      <div className="flex gap-x-4 max-h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="px-4 basis-1/4">
          <h4 className="text-2xl font-bold dark:text-white mb-5">{ group.setName }</h4>
          <div className="w-full mb-6 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {
              (group.songsConfig || []).map(({ configId, songName }) => (
                <button 
                    key={`${configId}-${songName}`}
                    onClick={() => selectSong(configId) }
                    aria-current="true"
                    className={`block w-full px-4 py-2 ${configId === selectedSong ? 'text-white bg-blue-700' : ''} border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600`}>
                  { songName }
                </button>
              ))
            }
          </div>
          <h4 className="text-2xl font-bold dark:text-white">Notas del Set</h4>
          <p className="mb-3 text-gray-500 dark:text-gray-400">{ group.setDescription }</p>
        </div>
        <div className="flex basis-1/2 grow max-h-[100vh] overflow-auto gap-x-1">
          {
            config 
            ? <Song {...config} />
            : <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Aquí podrás ver información de las canciones</p>
          }
        </div>
      </div>
    </section>
  </>);
};

export default ViewSet;