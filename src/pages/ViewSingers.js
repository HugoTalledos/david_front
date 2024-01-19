import { useEffect, useState, useContext } from "react";
import SingerApi from "../services/Singer";
import NotificationContext from '../context/notification-context';
import Load from "../components/Load";
import { Button, TextField } from "leita-components-ui";

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

    if (!singerName || singerName.length <= 0) {
      return dispatchData({ type: 'warning', text: 'El campo nombre es obligatorio' });
    }

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
    <div className="p-4">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h1 className="text-5xl font-extrabold dark:text-white mb-5" >Cantantes</h1>
        <div className="grid gap-6 mb-6 md:grid-cols-1">
          <div className="flex flex-column gap-10">
            <TextField
              label="Nombre del cantante"
              value={singerName}
              onChange={(e) => setSingerName(e.target.value)}
            />
            <Button
            type="link-primary"
              label="Guardar"
              onClick={() => {
                setAction('save');
                saveSinger();
              }}
            />
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
  </>);
}

export default ViewSingers;
