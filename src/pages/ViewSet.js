import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getSetById } from "../services/Set";
import NotificationContext from '../context/notification-context';

import ViewSetDesk from '../desktop/ViewSetDesk';
import ViewSetMobile from "../mobile/ViewSetMobile";
import Load from "../components/Load";


const ViewSet = () => {
  const { dispatchData } = useContext(NotificationContext);
  const [setId] = useState(useParams().setId);
  const [group, setGroup] = useState({});
  const [config, setConfig] = useState(null);
  const [songConfig, setSongConfig] = useState(null);
  const [selectedSong, setSelectedSong] = useState('');
  const [songsConfig, setSongsConfig] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    Promise.all([getSetById(setId)])
    .then(([{ songsConfig, ...all }]) =>{
      setGroup({ songsConfig, ...all });
      setSongsConfig(songsConfig);
      setSongConfig(songsConfig[0]);
      setLoading(false);
    })
    .catch((e) =>{console.log(e); dispatchData({ type: 'danger', text: 'Ocurrio un error, por favor intenta más tarde.' })});
  }, [setId, dispatchData]);

  const selectSong = (configId) => {
    const config = (songsConfig.find((song) => song.configId === configId) || {});
    setConfig(config);
    setSongConfig(config);
    setSelectedSong(configId);
  }

  return (<div className='switch_view'>
    {
      (loading)
      ? <Load fullScreen={true}/>
      : <>
        <ViewSetDesk group={group} onClick={(e) => selectSong(e)} config={config} selectedSong={selectedSong}/>
        <ViewSetMobile group={group} onClick={(e) => selectSong(e)} config={songConfig} />
      </>
    }
  </div>);
};

export default ViewSet;