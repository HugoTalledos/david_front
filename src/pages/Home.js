import { useEffect, useState, useContext } from 'react';
import { deleteSet } from '../services/Set';
import NotificationContext from '../context/notification-context';
import Card from '../components/Card';

import { getSets } from '../services/Set';
import Load from '../components/Load';
const Home = () => {
  const { dispatchData } = useContext(NotificationContext);
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSets()])
    .then(([data]) => setSets(data))
    .catch(() => dispatchData({ type: 'danger', text: 'Ocurrio un error obteniendo los sets. Intenta mas tarde.' }))
    .finally(() => setLoading(false));
  }, [dispatchData]);

  const actionDeleteSet = (set) => {
    const { setId } = set;
    let setAux = sets;
    return Promise.all([deleteSet({ setId })])
      .then(() => { 
        dispatchData({ type: 'success', text: 'Set eliminado exitosamente.' });
        const setIndex = sets.indexOf(set);
        const firstPart = setAux.slice(0, setIndex);
        const lastPart = setAux.slice(setIndex + 1, setIndex.lenght);
        setSets([...firstPart, ...lastPart]);        
      })
      .catch(() => dispatchData({ type: 'danger', text: 'Error creando eliminando set. intente mas tarde' }))
  }
  
  return (
      <div className="p-4 h-full">
        <div className="p-4 h-full border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex items-start mt-4 md:mt-6">
            <h1 className="text-5xl font-extrabold dark:text-white">MIS SETS</h1>
            <a href='/create' className="ml-auto py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Crear Set</a>    
          </div>
          {
            loading
              ? (<div className="flex justify-center h-[80%]">
                <Load />
              </div>)
              : <div className="flex mt-4 space-x-3 md:mt-6 w-full">
              { 
                (sets || []).map((props) => 
                  (<Card key={props.setId} {...props} onDelete={() => actionDeleteSet(props)} />))
              }
            </div>
          }
        </div>
      </div>);
}


export default Home;