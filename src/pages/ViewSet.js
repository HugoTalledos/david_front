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
  const [groupInfo, setGroupInfo] = useState({});
  const [songsConfig, setSongsConfig] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    Promise.all([getSetById(setId)])
    .then(([{ songConfig: songs, ...all }]) =>{
      setSongsConfig(songs);
      setGroupInfo(all);
      setLoading(false);
    })
    .catch((e) => dispatchData({ type: 'danger', text: 'Ocurrio un error, por favor intenta más tarde.' }));
  }, [setId, dispatchData]);

  return (<>
    {
      (loading)
      ? <Load fullScreen={true}/>
      : <>
        <ViewSetDesk songList={songsConfig} groupInfo={groupInfo}/>
        <ViewSetMobile groupInfo={groupInfo}  songList={songsConfig} />
      </>
    }
  </>);
};

export default ViewSet;