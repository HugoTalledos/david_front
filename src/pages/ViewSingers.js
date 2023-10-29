import { useEffect, useState, useContext } from "react";
import SingerApi from "../services/Singer";
import NotificationContext from '../context/notification-context';
import Load from "../components/Load";

const ViewSingers = () => {
  const { dispatchData } = useContext(NotificationContext);
  const [singerName, setSingerName] = useState('');
  const [singerList, setSingerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState('save');
  const [id, setId] = useState('');

  useEffect(() => {
    Promise.all([SingerApi.getSingers()])
    .then(([resp]) => setSingerList([...resp.map((singer) => singer)]))
    .catch((e) =>{console.log(e); dispatchData({ type: 'danger', text: 'Ocurrio un error, por favor intenta más tarde.' })})
    .finally(() => setLoading(false));
  }, [dispatchData]);


  const saveSinger = async () => {
    const isCreation =  action === 'save';
  
    let promise = isCreation ? SingerApi.createSinger({ singerName }) : SingerApi.updateSinger({ singerId: id, singerName, status: true });

    return Promise.all([promise])
    .then(([resp]) => {
      dispatchData({ type: 'success', text: `Cantante ${isCreation ? 'creado' : 'actualizado'} correctamente` })
      setSingerName('');
      if (isCreation) return singerList.push(resp);

      const singerRow = singerList.find(({ singerId }) => singerId === resp.singerId);
      const singerIndex = singerList.indexOf(singerRow);
      const firstPart = singerList.slice(0, singerIndex);
      const lastPart = singerList.slice(singerIndex + 1, singerList.lenght);
      firstPart.push(resp);
      setSingerList([...firstPart, ...lastPart]);
    })
    .catch((e) =>{console.log(e); dispatchData({ type: 'danger', text: 'Ocurrio un error, por favor intenta más tarde.' })});
  };

  const deleteSinger = async (singerId, status) => {
    return Promise.all([SingerApi.deleteSinger({ singerId, status })])
    .then(() => {
      dispatchData({ type: 'success', text: `Cantante ${status ? 'activado' : 'eliminado'} correctamente` })
      const singerRow = singerList.find((singer) => singer.singerId === singerId);
      const singerIndex = singerList.indexOf(singerRow);
      const firstPart = singerList.slice(0, singerIndex);
      const lastPart = singerList.slice(singerIndex + 1, singerList.lenght);
      singerRow.status = status;
      firstPart.push(singerRow);
      setSingerList([...firstPart, ...lastPart]);
    })
    .catch((e) =>{console.log(e); dispatchData({ type: 'danger', text: 'Ocurrio un error, por favor intenta más tarde.' })})
  }

  return (<>
  <section className="flex min-h-screen flex-col ml-64 p-10">
      <div className="p-4">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex items-start mt-4 md:mt-6 pb-5">
            <h1 className="text-5xl font-extrabold dark:text-white" >Cantantes</h1>
            <button type="button" onClick={() => {
              setAction('save');
              saveSinger();
              }} className="ml-auto py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 12 5.419 3.871A1 1 0 0 0 16 15.057V2.943a1 1 0 0 0-1.581-.814L9 6m0 6V6m0 6H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7m-5 6h3v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm15-3a3 3 0 0 1-3 3V6a3 3 0 0 1 3 3Z"/>
              </svg>
            </button>    
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-1">
            <div>
              <label for="singerName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del cantante</label>
              <input type="text"
                     value={singerName}
                     onChange={(e) => setSingerName(e.target.value)}
                     id="singerName"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Nombre del cantante</th>
                      <th scope="col" className="px-6 py-3">Estado</th>
                      <th scope="col" className="px-6 py-3">Acción</th>
                    </tr>
                  </thead>
                  {
                    loading
                    ? <Load fullScreen={true}/>
                    :  singerList.length <= 0
                      ? <p>No hya cantantes creados</p>
                      : singerList.map(({ singerName, singerId, status}) => (<tbody>
                      <tr id={singerId} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          { singerName }
                        </th>
                        <td className="px-6 py-4">{ status ? 'Activo' : 'Deshabilitado'}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => {
                            setSingerName(singerName);
                            setId(singerId);
                            setAction('edit');
                          }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-5">Editar</button>
                          <button onClick={() => deleteSinger(singerId, !status)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Eliminar</button>
                        </td>
                      </tr>
                    </tbody>))
                  }
                  
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>);
}

export default ViewSingers;
