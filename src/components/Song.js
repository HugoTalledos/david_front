'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import { markToHTML } from '../utils/Utils';
import tickOgg from '../assets/tick.ogg';
import tickMp3 from '../assets/tick.mp3';
import { REACT_APP_STRAPPI_URL } from '../config';
import useMetronome from "../hooks/useMetronome";

const Song = ({ songName, singer, songTonality, songTempo, songResourse, lyric, chords, multitrack }) => {
  const [onlyLyrics, setOnlyLyrics] = useState(false);
  const [active, setActive] = useState(false);
  const audioRef = useRef();
  const { startOrStop } = useMetronome({ tempo: songTempo, audioRef });

  const startOrStopMetro = useCallback(() => startOrStop(active), [active]);
  useEffect(() => {startOrStopMetro(active)}, [active, startOrStopMetro]);

  return (<>
  <section className='flex flex-col gap-y-3 w-full'>
    <div className='flex max-h-[80vh]'>
      <div className='flex flex-col grow mr-6'>
        <div className="mb-6">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{ songName }</h1>
          <h2 className="text-4xl font-extrabold dark:text-white">{ singer }</h2>
            <div className="flex items-center justify-between mt-4 md:mt-6">
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Tonalidad: { songTonality }</p>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Tempo: { songTempo } BPM</p>
            </div>
        </div>
        <div className="overflow-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
          <p className="mb-3 text-gray-500 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: markToHTML(onlyLyrics ? lyric : chords) }}/>
        </div>
      </div>

      <div className="px-4">
        <h4 className="text-2xl font-bold dark:text-white mb-5">Herramientas</h4>
        <div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <button onClick={() => setActive(!active)} aria-current="true" className={`${ active && 'text-white bg-blue-700'} block w-full px-4 py-2 border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600`}>
            Metronómo
          </button>
          <a href={songResourse} target='_blank'
            rel='noopener noreferrer'
            className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Referencia
          </a>
          <span className={`block w-full px-4 py-2 border-b border-gray-200 ${onlyLyrics ? 'text-white bg-blue-700' : ''} cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`}
                onClick={() => setOnlyLyrics(!onlyLyrics)}>
            Solo { onlyLyrics ? 'acordes' : 'letra'}
          </span>
        </div>
      </div>
    </div>
    {
      multitrack && (
      <audio className='w-full' controls>
        <source src={`${REACT_APP_STRAPPI_URL}${multitrack}`} type="audio/ogg" />
        <source src={`${REACT_APP_STRAPPI_URL}${multitrack}`} type="audio/mpeg" />
        <source src={`${REACT_APP_STRAPPI_URL}${multitrack}`} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      )
    }
  </section>
  <audio id='audio-metronomo' ref={audioRef}>
    <source src={tickOgg} type='audio/ogg' />
    <source src={tickMp3} type='audio/mpeg' />
  </audio>
</>);
}

export default Song;