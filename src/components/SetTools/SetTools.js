import { Button } from "leita-components-ui";
import { useCallback, useEffect, useRef, useState } from "react";
import useMetronome from "../../hooks/useMetronome";
import tickOgg from '../../assets/tick.ogg';
import tickMp3 from '../../assets/tick.mp3';
import './SetTools.css'

const SetTools = ({ songTempo, songResource, showLyrics }) =>{
  const [onlyLyrics, setOnlyLyrics] = useState(false);
  const [active, setActive] = useState(false);
  const audioRef = useRef();

  const { startOrStop } = useMetronome({ tempo: songTempo, audioRef });

  const startOrStopMetro = useCallback(() => startOrStop(active), [active]);
  useEffect(() => {startOrStopMetro(active)}, [active, startOrStopMetro]);

  return (<div className="btn__group border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <Button
      disabled={!songTempo}
      label="Metronómo"
      type="dark-outline"
      onClick={() => setActive(!active)}
    />
    <Button type="dark-outline" disabled={!songResource}>
      <a href={songResource} rel='noreferrer' target='_blank'>Referencia</a>
    </Button>
    <Button
      disabled={!songTempo}
      type="dark-outline"
      onClick={() => {
        setOnlyLyrics(!onlyLyrics);
        showLyrics(!onlyLyrics);
      }}
      label={`Ver ${ onlyLyrics ? 'acordes' : 'letra'}`} />

    <audio id='audio-metronomo' ref={audioRef}>
      <source src={tickOgg} type='audio/ogg' />
      <source src={tickMp3} type='audio/mpeg' />
    </audio>
  </div>);
};

export default SetTools;
