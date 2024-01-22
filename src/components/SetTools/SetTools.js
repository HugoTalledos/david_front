import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "leita-components-ui";
import Modal from "../Modal";
import NotificationContext from '../../context/notification-context';
import useMetronome from "../../hooks/useMetronome";
import tickOgg from '../../assets/tick.ogg';
import tickMp3 from '../../assets/tick.mp3';
import './SetTools.css'

const SetTools = ({
  songTempo,
  songResources = [],
  showLyrics,
  details,
  title
}) => {
  const { dispatchData } = useContext(NotificationContext);
  const [onlyLyrics, setOnlyLyrics] = useState(false);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const audioRef = useRef();

  const { startOrStop } = useMetronome({ tempo: songTempo, audioRef });

  const startOrStopMetro = useCallback(() => startOrStop(active), [active]);
  useEffect(() => {
    if (songTempo > 300) {
      dispatchData({ type: 'danger', text: 'Metronómo no disponible.' })
      return;
    }
    startOrStopMetro(active)
  }, [active, startOrStopMetro]);

  return (<div className="btn__group border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <Button
      disabled={!songTempo}
      label="Metronómo"
      type="dark-outline"
      onClick={() => setActive(!active)}
    />
    <>
      <Button
        label="Referencias"
        onClick={() => setOpen(!open)}
        type="dark-outline"
        disabled={songResources.length <= 0}
      />
      <div id="dropdownTop" className={`fixed z-10 ${open ? 'block': 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownTopButton">
          {
            songResources.map((resource, idx) => (
              <li>
                <a target="_blank"
                  rel="noreferrer"
                  href={resource}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Referencia { idx + 1 }
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </>
    <Button
      disabled={!songTempo}
      type="dark-outline"
      onClick={() => {
        setOnlyLyrics(!onlyLyrics);
        showLyrics(!onlyLyrics);
      }}
      label={`Ver ${ onlyLyrics ? 'acordes' : 'letra'}`} />
    
    <Button
      type="dark-outline"
      disabled={!details}
      onClick={() => setShow(true)}
      label="Info"
      icon="information" />

    <Modal
      isOpen={show}
      onClose={() => setShow(false)}
      title={`Notas del Set: ${title}`}
      children={<pre className="mb-3 text-gray-500 dark:text-gray-400 whitespace-break-spaces">
        {details || 'No hay notas por mostrar'}
        </pre>}
    />

    <audio id='audio-metronomo' ref={audioRef}>
      <source src={tickOgg} type='audio/ogg' />
      <source src={tickMp3} type='audio/mpeg' />
    </audio>
  </div>);
};

export default SetTools;
