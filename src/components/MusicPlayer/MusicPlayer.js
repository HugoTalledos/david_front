import { Button } from 'leita-components-ui';
import WaveSurfer from 'wavesurfer.js';
import './MusicPlayer.css';
import { useEffect, useState } from 'react';

const MusicPlayer = ({ secuence = [] }) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  useEffect(() => {
    if (secuence.length <= 0) return;
    console.log(secuence[0]);

    setWavesurfer(WaveSurfer.create({
      container: '#waveform',
      waveColor: '#ddd',
      progressColor: '#ff006c',
      barWidth: 4,
      height: 80,
      barRadius: 4,
      width: 200,
      url: secuence[0],
    }));
  }, [secuence]);

  useEffect(() => {
     if (!wavesurfer) return;
     
    wavesurfer.load(secuence[0])
  }, [wavesurfer]);

  return (<div className='musicplayer-container border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
    <div id='waveform'></div>
    <Button icon='music-note-eighth' label='Instru'/>
  </div>);
};

export default MusicPlayer;
