import './SongList.css';
const SongList = ({ list, onClickRow = undefined }) => (
  <div className="h-full overflow-auto p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Canción</th>
            <th scope="col" className="px-6 py-3">Tono</th>
            <th scope="col" className="px-6 py-3">BPM</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map(({ songId, songName, songTonality, songTempo, ...all }) => (
              <tr
                key={songId}
                className="bg-white cursor-pointer border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                onClick={() => onClickRow({ songId, songName, songTonality, songTempo, ...all })}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white">
                  { songName }
                </th>
                <td className="px-6 py-4"> { songTonality } </td>
                <td className="px-6 py-4"> { songTempo } </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
);

export default SongList;