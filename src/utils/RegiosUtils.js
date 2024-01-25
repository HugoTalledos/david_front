export const loadTrackFromBlob = (wavesurferInstance, trackBlob) => {
  const reader = new FileReader();
    reader.onload = async (event) => {
      let blob = new window.Blob([new Uint8Array(event.target.result)], { type: "audio/mpeg"});
      wavesurferInstance.loadBlob(blob);
    };
    reader.readAsArrayBuffer(trackBlob);
}

export const loadTrackFromString = (wavesurferInstance, track) => {
  wavesurferInstance.load(track);
}