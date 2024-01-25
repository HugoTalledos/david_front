import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useWavesurfer } from '@wavesurfer/react'
import { Button, Select } from "leita-components-ui";
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm';
import Modal from '../Modal';
import { markerTypes } from "../../utils/constants";
import ButtonsRegion from "./ButtonsRegion";
import { loadTrackFromBlob, loadTrackFromString } from '../../utils/RegiosUtils';
import { useState } from 'react';
import { roundTimeMarker } from '../../utils/Utils';

const PreviewTrack = ({ track, time, regions = [], getRegions }) => {
  const containerRef = useRef(null);
  const wsRegion = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    waveColor: '#9b9b9b96',
    progressColor: '#2274A5',
    barGap: 3,
    barRadius: 3,
    barWidth: 3,
    cursorWidth: 2,
    dragToSeek: true,
    width: '100%',
    height: 60,
    plugins: useMemo(() => [Timeline.create({
      timeInterval: time,
      secondaryLabelOpacity: 1,
      style: { fontSize: '0px' }
    })], [time]),
  });

  useEffect(() => {
    if (!track) return;
    
    if (typeof track === 'object') loadTrackFromBlob(wavesurfer, track);
    else loadTrackFromString(wavesurfer, track);

    
    if (!regions) return;

    wsRegion.current = wavesurfer.registerPlugin(RegionsPlugin.create());
    wavesurfer.on('redrawcomplete', () => {
      regions.forEach(({ color, label, regionId, end, start}) => {
        wsRegion.current.addRegion({
          id: regionId,
          start,
          end,
          color,
          content: label,
          resize: false,
          drag: false
        });
      })
      setSelectedRegion(null);
      setVisible(true);
    }, { once: true });
    wsRegion.current.enableDragSelection({ color: 'rgba(255, 0, 0, 0.1)' });
  }, [track, wavesurfer]);


  const stopAudio = () => wavesurfer.stop();

  const playOrPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  const activeEditMode = () => {
    wsRegion.current.on('region-clicked', (region, e) => {
      e.stopPropagation();
      region.play();
      setSelectedRegion(region);
    });

    wsRegion.current.on('region-created', (region) => {
      setSelectedRegion(region);
      if (region.start === 0) {
        region.setOptions({ start: 0 });
      } else {
        region.setOptions({
          start: roundTimeMarker(region.start, time),
          end: roundTimeMarker(region.end, time)
        })
      }     
      setIsOpen(true);
    });

    wsRegion.current.on('region-updated', (region) => {
      const starTime = roundTimeMarker(region.start, time);
      const endTime = roundTimeMarker(region.end, time);
      region.setOptions({ start: starTime, end: endTime });
    });

    wsRegion.current.on('region-double-clicked', (region) => {
      setIsOpen(true);
      setSelectedRegion(region);
      stopAudio();
    });

    if (wsRegion.current.getRegions().length > 0) {
      wsRegion.current.getRegions().forEach((r) => r.setOptions({ resize: true, drag: true }))
    }
  }

  const createRegion = (regionConfig) => {
    const { label, color, value } = markerTypes.find(({ value }) => value === regionConfig);
    selectedRegion.setOptions({ color, content: label || 'Tag', id: value || 'tag' });
    setIsOpen(false);
  };

  const removeRegion = () => {
    selectedRegion.remove();
    wavesurfer.pause();
    setSelectedRegion(null);
  }

  const saveRegions = () => {
    const allRegions = wsRegion.current.getRegions();
    allRegions.forEach((r) => {
      if (!r.content) return r.remove();
      r.setOptions({ resize: false, drag: false })
    });
    const clearRegions = wsRegion.current.getRegions();
    getRegions(clearRegions);
    wsRegion.current.unAll();
  }

  return (<div className='flex flex-row w-full py-5 align-center'>
    {
      visible && (<>
        <Button  icon={`${isPlaying ? 'pause' : 'play'}`} type='link' onClick={playOrPause} />
        <Button icon='stop' type='link' onClick={stopAudio} />
      </>)
    }
    <div className={`${!visible ? 'hidden' : 'block'} w-full`} ref={containerRef}/>
    <ButtonsRegion
      show={visible}
      isRegionSelected={selectedRegion}
      wavesurferInstance={wavesurfer}
      onActive={activeEditMode}
      onRemove={removeRegion}
      onSave={saveRegions}
    />

    <Modal
      title={'Agrega una nueva sección'}
      isOpen={isOpen}
      children={<Select onChange={(e) => createRegion(e.target.value)} options={markerTypes}/>}
    />
  </div>);
}

export default PreviewTrack;
