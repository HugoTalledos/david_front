import { useEffect, useRef, useState } from 'react';
import { Button, TabItem, Tabs } from 'leita-components-ui';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm';
import './MusicPlayer.css';

const MusicPlayer = ({ secuence = [], songTempo: bpm }) => {
  const wavesurfer = useRef(null);
  const [waveFormLoaded, setWaveFormLoaded] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [open, setOpen] = useState(false);
  const [speedSelected, setSpeedSelected] = useState('100');
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (secuence.length <= 0) return;

    setWaveFormLoaded(true);
    wavesurfer.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#9b9b9b96',
      progressColor: '#2274A5',
      cursorWidth: 2,
      height: 60,
      plugins: [TimelinePlugin.create({
        timeInterval: ((60 * 4) / bpm),
//        secondaryLabelInterval: ((60 * 4) / bpm),
        secondaryLabelOpacity: 1,
        height: 900,
        style: {
          fontSize: '1px',
          position: 'absolute',
          width: '100%',
          top: '0',
        }
      })],
    });

    wavesurfer.current.load(secuence[0]);
  }, [secuence]);

  
  const playAudio = () => {
    if (wavesurfer.current.isPlaying()) wavesurfer.current.pause();
    else wavesurfer.current.play();
    console.log(wavesurfer.current.getCurrentTime())
    setIsPlayed(!isPlayed);
  };

  const changeSpeedTrack = (speed) => {
    setSpeedSelected((speed * 100).toString())
    wavesurfer.current.setPlaybackRate(speed, true);
  }


  return (<div className='musicplayer-container border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
    <div className='mediaplayer'>
      <Button label={`${isPlayed ? 'Pause' : 'Play'}`} onClick={playAudio} disabled={secuence.length <= 0}/>
      <div id='waveform' style={{ display: `${waveFormLoaded ? 'block' : 'none'}`}}></div>
      { !waveFormLoaded && <div className='loaded-song'/> }
    </div>
    <Button
      icon='music-note-eighth'
      label='Config'
      onClick={() => setOpen(true)}
      disabled={secuence.length <= 0}
    />

      
    <div className={`lateral_container ${!open ? 'hidden-lateral' : ''}`}>
      <div className="lateral_container--content">
        <button type="button" onClick={() => setOpen(!open)} className="close">
          Close
          <span id="left" className="mdi mdi-24px mdi-arrow-right-drop-circle" />
        </button>
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Configuración</h2>
        <div className='flex flex-col gap-5 mt-5'>
          <h6 className="text-lg font-bold dark:text-white">Velocidad</h6>
          <Tabs>
            <TabItem
              onClick={() => changeSpeedTrack(0.25)}
              label='x0.25'
              active={speedSelected === '25'}
            />
            <TabItem
              onClick={() => changeSpeedTrack(0.5)}
              label='x0.5'
              active={speedSelected === '50'}
            />
            <TabItem
              onClick={() => changeSpeedTrack(0.75)}
              label='x0.75'
              active={speedSelected === '75'}
            />
            <TabItem
              onClick={() => changeSpeedTrack(1)}
              label='Normal'
              active={speedSelected === '100'}
            />
          </Tabs>
          
          <div className="relative mb-6">
            <label htmlFor="labels-range-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Volumen: {(volume * 100).toFixed(0)}%</label>
            <input 
              id="labels-range-input"
              type="range"
              value={volume}
              onChange={(e) => {
                setVolume(e.target.value);
                wavesurfer.current.setVolume(e.target.value);
              }}
              min="0"
              max="1"
              step='0.01'
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">0%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">25%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">50%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">75%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">100%</span>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default MusicPlayer;
