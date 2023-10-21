import { useState, useEffect, useCallback, useRef } from 'react';
import { REACT_APP_STRAPPI_URL } from '../config';
import { markToHTML } from '../utils/Utils';
import useMetronome from "../hooks/useMetronome";
import {ReactComponent as ToolSVG} from '../assets/icons/tool.svg';
import {ReactComponent as CloseSVG} from '../assets/icons/close.svg';
import tickOgg from '../assets/tick.ogg';
import tickMp3 from '../assets/tick.mp3';

const ViewSetMobile = ({ group, onClick, config}) => {
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [active, setActive] = useState(false);
  const [onlyLyrics, setOnlyLyrics] = useState(false);
  const audioRef = useRef();
  const { startOrStop } = useMetronome({ tempo: config.songTempo, audioRef });

  const startOrStopMetro = useCallback(() => startOrStop(active), [active]);
  useEffect(() => {startOrStopMetro(active)}, [active, startOrStopMetro]);

  return (<section id="mobile" className="flex flex-col justify-center gap-y-3 p-5 h-[95vh] box-content">
    <div id="drawer-navigation" class={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${ open ? 'transform-none' : '-translate-x-full'} bg-white dark:bg-gray-800`} tabindex="-1" aria-labelledby="drawer-navigation-label">
      <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">{ group.setName }</h5>
      <button type="button"
              onClick={() => setOpen(false)}
              data-drawer-hide="drawer-navigation"
              aria-controls="drawer-navigation"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <span class="sr-only">Close menu</span>
        <CloseSVG />
      </button>
      <div class="py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
          <li>
            <button onClick={() => setActive(!active)} aria-current="true" className={`${ active && 'text-white bg-blue-700'} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
              Metronómo
            </button>
          </li>
          <li>
            <a href={config.songResourse} target='_blank'
               rel='noopener noreferrer'
               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              Referencia
            </a>
          </li>
          <li>
            <span className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${onlyLyrics ? 'text-white bg-blue-700' : ''}`}
                  onClick={() => setOnlyLyrics(!onlyLyrics)}>
                Solo { onlyLyrics ? 'acordes' : 'letra'}
            </span>
          </li>
        </ul>
      </div>
    </div>
    {
      !config
      ? <p>:c</p>
      : <>
        <div className='flex flex-col grow max-h-[90%] w-full'>
          <div className="mb-6">
            <div className='flex justify-between gap-3'>
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{ config.songName }</h1>
              <div className='relative'>
                <button id="dropdownDefaultButton"
                        onClick={() => setOpenDrop(!openDrop)}
                        data-dropdown-toggle="dropdown"
                        class="h-3 border border-gray-200 text-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                  <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>

                <div id="dropdown"
                    style={{ transform: 'translate(-120px, 10px)' }}
                    class={`absolute z-4 ${openDrop ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton">
                    {
                      (group.songsConfig || []).map(({ configId, songName }) => (
                        <li key={`${configId}-${songName}`}>
                          <span  onClick={() => onClick(configId)}
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            { songName }
                          </span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold dark:text-white">{ config.singer}</h2>
            <div className="flex items-center justify-between mt-4 md:mt-6">
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Tonalidad: { config.songTonality }</p>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Tempo: { config.songTempo } BPM</p>
            </div>
          </div>

          <div className="overflow-auto p-6 max-h-[60vh] bg-white border border-gray-200 rounded-lg shadow">
            <p className="mb-3 text-gray-500 dark:text-gray-400"
               dangerouslySetInnerHTML={{ __html: markToHTML(onlyLyrics ? config.lyric : config.chords) }}/>
          </div>
        </div>
    
        <div class="flex content-center mt-auto gap-2">
          <button type="button"
                  onClick={() => setOpen(!open)}
                  class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <ToolSVG />
          </button>
          {
            config.multitrack ?
            (<audio controls className='w-full'>
              <source src={`${REACT_APP_STRAPPI_URL}${config.multitrack || ''}`} type="audio/ogg" />
              <source src={`${REACT_APP_STRAPPI_URL}${config.multitrack || ''}`} type="audio/mpeg" />
              <source src={`${REACT_APP_STRAPPI_URL}${config.multitrack || ''}`} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>)
            : <p>Esta canción no cuenta con secuencia</p>
          }
        </div>
      </>
    }
    <audio id='audio-metronomo' ref={audioRef}>
      <source src={tickOgg} type='audio/ogg' />
      <source src={tickMp3} type='audio/mpeg' />
    </audio>
  </section>)
};

export default ViewSetMobile;