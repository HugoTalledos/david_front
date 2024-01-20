import { markToHTML } from "../utils/Utils";

const TextView = ({
  songName = '',
  singerName = '',
  songTonality = '',
  songTempo = '',
  songLyric = '',
  songChords = '',
  onlyLyrics = false
}) => (
  <div className="border-2 border-gray-200 w-[60%] p-6 border-dashed rounded-lg dark:border-gray-700">
    <div className='flex flex-col grow'>
    <div className="mb-6">
      <h5 className="text-xl font-bold dark:text-white">{ songName }</h5>
      <h6 className="text-lg font-bold dark:text-white">{ singerName }</h6>
      <div className="flex items-center justify-between mt-4">
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Tonalidad: { songTonality }</p>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Tempo: { songTempo } BPM</p>
      </div>
    </div>
    <div className="overflow-auto p-6 bg-white border border-gray-200 rounded-lg shadow h-[51vh]">
      <p className="mb-3 text-gray-500 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: markToHTML(onlyLyrics ? songLyric : songChords) }}/>
    </div>
  </div>
</div>);

export default TextView;