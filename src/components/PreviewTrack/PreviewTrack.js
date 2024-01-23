import { useEffect, useRef, useState } from "react";
import { Button, Select } from "leita-components-ui";
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm';
import Modal from '../Modal';
import { markerTypes } from "../../utils/constants";
import { roundTimeMarker } from "../../utils/Utils";

const PreviewTrack = ({ visible, track, time }) => {
  const wavesurfer = useRef(null);
  const wsRegions = useRef(null);
  const [isPlayed, setIsPlayed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  useEffect(() => {
    if (!track) return;
    if (wavesurfer.current) wavesurfer.current.destroy();
    wavesurfer.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#9b9b9b96',
      progressColor: '#2274A5',
      barGap: 3,
      barRadius: 3,
      barWidth: 3,
      cursorWidth: 2,
      dragToSeek: true,
      height: 60,
      minPxPerSec: 0,
      plugins: [TimelinePlugin.create({
        timeInterval: time,
        secondaryLabelOpacity: 1,
        style: { fontSize: '0px' }
      })],
    });

    const reader = new FileReader();

    reader.onload = async (event) => {
      let blob = new window.Blob([new Uint8Array(event.target.result)], { type: "audio/mpeg"});
      wavesurfer.current.loadBlob(blob);
    };
    reader.readAsArrayBuffer(track);

    wsRegions.current = wavesurfer.current.registerPlugin(RegionsPlugin.create());
    wsRegions.current.enableDragSelection({ color: 'rgba(255, 0, 0, 0.1)' });

    wsRegions.current.on('region-clicked', (region, e) => {
      e.stopPropagation();
      region.play();
      setIsPlayed(true);
      setSelectedRegion(region);
    });

    wsRegions.current.on('region-created', (region) => {
      setSelectedRegion(region);
      if (region.start === 0) {
        setStart(0);
      } else {
        setStart(roundTimeMarker(region.start, time));
        setEnd(roundTimeMarker(region.end, time));
      }     
      setIsOpen(true);
    });

    wsRegions.current.on('region-updated', (region) => {
      const starTime = roundTimeMarker(region.start, time);
      const endTime = roundTimeMarker(region.end, time);

      region.setOptions({ start: starTime, end: endTime });
    });

    wsRegions.current.on('region-double-clicked', (region) => {
      setIsOpen(true);
      setSelectedRegion(region);
      stopAudio();
    });
  }, [track, time]);

  const playAudio = () => {
    if (wavesurfer.current.isPlaying()) wavesurfer.current.pause();
    else wavesurfer.current.play();
    setIsPlayed(!isPlayed);
  };

  const stopAudio = () => {
    wavesurfer.current.stop();
    setIsPlayed(false);
  }

  const removeRegion = () => {
    selectedRegion.remove();
    wavesurfer.current.pause();
    setSelectedRegion(null);
    setIsPlayed(false);
  }

  const createRegion = (regionConfig) => {
    const { label, color, value } = markerTypes.find(({ value }) => value === regionConfig);
    selectedRegion.setOptions({
      color,
      start,
      end,
      content: label || 'Tag',
      id: value || 'tag',
    });

    setIsOpen(false);
  };

  return (<div className='flex flex-row w-full py-5 align-center'>
    {
      visible && (<>
        <Button  icon={`${isPlayed ? 'pause' : 'play'}`} type='link' onClick={playAudio} />
        <Button icon='stop' type='link' onClick={stopAudio} />
      </>)
    }
    <div id='waveform' className={`${!visible ? 'hidden' : 'block'}`}></div>
    { visible && (<Button icon="delete" type='link' disabled={!selectedRegion} onClick={removeRegion} />) }
    <Modal
      title={'Agrega una nueva sección'}
      isOpen={isOpen}
      children={<Select onChange={(e) => createRegion(e.target.value)} options={markerTypes}/>}
    />
  </div>);
}

export default PreviewTrack;
