import { useState } from "react";
import SetTools from "../components/SetTools/SetTools";
import SongList from "../components/SongList/SongList";
import TextView from "../components/TextView";
import './ViewSetDesk.css';
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";

const ViewSetDesk = ({ songList }) => {
  const [selectedSong, setSelectedSong] = useState({});
  const [showLyrics, setShowLyrics] = useState(false);

  return(<div className="desktop__layout">
    <MusicPlayer {...selectedSong} />
    <div className="desktop__layout-list">
      {
        selectedSong
        ? <TextView {...selectedSong} onlyLyrics={showLyrics}/>
        : <p>No hay nada</p>
      }
      <div className="desktop__layout-tools">
        <SongList list={songList} onClickRow={(e) => setSelectedSong(e)}/>
        <SetTools {...selectedSong} showLyrics={(e) => setShowLyrics(e)} />
      </div>
    </div>
  </div>);
};

export default ViewSetDesk;