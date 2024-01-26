import { markToHTML } from "../utils/Utils";

const TextView = ({
  songName = '',
  singerName = '',
  songTonality = '',
  songTempo = '',
  songLyrics = '',
  songChords = '',
  onlyLyrics = false
}) => (
  <div className="box-border max-[767px]:mb-2 w-[60%] max-[767px]:w-full max-[767px]:h-full p-3 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div className='flex flex-col grow h-full'>
      <div className="mb-6  max-[767px]:mb-3">
        <div className="flex items-center justify-between mt-4">
          <h5 className="text-xl font-bold dark:text-white  max-[767px]:hidden">{ songName }</h5>
          <h6 className="text-lg font-bold dark:text-white  max-[767px]:text-base">{ singerName }</h6>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 max-[767px]:text-base">Tonalidad: { songTonality }</p>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 max-[767px]:text-base">Tempo: { songTempo } BPM</p>
        </div>
      </div>
      <div className="overflow-auto p-3 bg-white border border-gray-200 rounded-lg shadow h-full">
        <pre className="mb-3 text-sm text-gray-500 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: markToHTML(onlyLyrics ? songLyrics : songChords) }}/>
      </div>
    </div>
</div>);

export default TextView;