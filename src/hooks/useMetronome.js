import { useRef, useState } from 'react';

const useMetronome = ({
  tempo = 120,
  compas = '4/4',
  audioRef,
}) => {
  const [, setIsPlay] =  useState(false);
  const [metronomo, setMetronomo] = useState(null);
  const fromRef = useRef();

  const element = audioRef ? audioRef.current : fromRef.current;

  const startOrStop = (isPlay) => {
    setIsPlay(!isPlay);
    clearInterval(metronomo);
    if (!isPlay) return;

    setMetronomo(setInterval(() => element.play(), BPMToMiliseconds(tempo)));
    return metronomo;
  }

  const BPMToMiliseconds = (bpm) => (60 / bpm) * 1000

  return {
    startOrStop
  };
};

export default useMetronome;
