import { useState } from 'react';
import { Button } from 'leita-components-ui';
const Card = ({ setId, setName, songsConfig, setDescription, onDelete }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4" style={{ position: 'relative' }}>
        <Button type='link' onClick={() => setOpen(!open)} icon='dots-vertical'/>
        <div id="dropdown" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(200px, 50px)' }}
             className={`z-10 ${ open ? '' : 'hidden' } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a href={`/edit/set/${setId}`}
                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Editar</a>
            </li>
            <li>
              <a  href={`/view/set/${setId}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Ver</a>
            </li>
            <li>
              <button onClick={onDelete} className="block px-4 py-2 w-full text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Eliminar</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center px-4 pb-4">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ setName }</h5>
        <div className="flex mt-4 md:mt-6 pb-2">
          <span className="text-md text-gray-500 dark:text-gray-400">Canciones</span>
          <span className="ml-auto text-md text-gray-500 dark:text-gray-400">30 min</span>
        </div>
        <ul className="pl-2 pb-2 max-w-md space-y-1 text-sm text-gray-500 list-disc list-inside dark:text-gray-400">
          { (songsConfig || []).map(({ songId, songName }) => (<li key={songId}>{songName}</li>)) }
        </ul>
        <h6 className="text-lg font-bold dark:text-white">Nota: </h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">{ setDescription }</p>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <a href={`/view/set/${setId}`}
             className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Ver Set</a>
        </div>
      </div>
    </div>);
}

export default Card;