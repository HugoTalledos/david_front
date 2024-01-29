import { useState } from "react";
import SetTools from "../components/SetTools/SetTools";
import SongList from "../components/SongList/SongList";
import TextView from "../components/TextView";
import './ViewSetDesk.css';
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";

const ViewSetDesk = ({ songList, groupInfo }) => {
  const [selectedSong, setSelectedSong] = useState({});
  const [showLyrics, setShowLyrics] = useState(false);

  return(<div id="desktop" className="desktop__layout">
    <MusicPlayer {...selectedSong} />
    <div className="flex gap-5 h-full overflow-auto">
      {
        selectedSong
        ? <TextView {...selectedSong} onlyLyrics={showLyrics}/>
        : <p>No hay nada</p>
      }
      <div className="flex flex-col h-full gap-5 w-[40%]">
        <SongList list={songList} onClickRow={(e) => setSelectedSong(e)}/>
        <SetTools {...selectedSong } 
          details={groupInfo.setDescription}
          title={groupInfo.setName}
          showLyrics={(e) => setShowLyrics(e)}
        />
      </div>
    </div>
  </div>);
};

export default ViewSetDesk;