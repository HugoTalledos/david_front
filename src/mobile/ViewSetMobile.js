import { useState, useEffect } from 'react';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import { Button, Select } from 'leita-components-ui';
import TextView from '../components/TextView';
import SetTools from '../components/SetTools/SetTools';

const ViewSetMobile = ({ groupInfo, songList}) => {
  const [songOptions, setSongOptions] = useState([]);
  const [optionSelected, setOptionSelected] = useState('');
  const [selectedSong, setSelectedSong] = useState({});
  const [openDrop, setOpenDrop] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  useEffect(() => {
    setSongOptions([...songList.map(({ songName, songId  }) => ({ label: songName, value: songId }) )])
  }, []);

  useEffect(() => {
    setSelectedSong(songList.find((item) => item.songId === optionSelected));
  }, [optionSelected]);

  return (<section id="mobile" className="flex flex-col items-center justify-center mt-[70px] h-[100vh] w-full">
    <div className='flex items-center'>
      <Select
        label='Canciones'
        options={[{ label: ' ', value: null}, ...songOptions]}
        value={optionSelected}
        onChange={(e) => setOptionSelected(e.target.value)}
      />
      <div className='relative'>
        <Button icon='tools' type='link' onClick={() => setOpenDrop(!openDrop)} />
        <div id="dropdownHover" class={`z-10 ${openDrop ? '' : 'hidden'} fixed  right-[10px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
        <SetTools {...selectedSong } 
          details={groupInfo.setDescription}
          title={groupInfo.setName}
          showLyrics={(e) => setShowLyrics(e)}
        />
        </div>
      </div>
    </div>
    {
        selectedSong
        ? <TextView {...selectedSong} onlyLyrics={showLyrics} />
        : <p>No hay nada</p>
    }
    <MusicPlayer {...selectedSong} mobileView={true} />
  </section>)
};

/**/

export default ViewSetMobile;