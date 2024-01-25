import { Button } from "leita-components-ui";

const Modal = ({ isOpen, onClose, title, children }) => (<>
  <div id="default-modal" tabIndex="-1" aria-hidden="true" className={`${isOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-20 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div className="relative p-4 max-w-2xl max-h-full m-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          { onClose && <Button type="link" onClick={onClose} icon="close" /> }
        </div>
        <div className="p-4 md:p-5 space-y-4">{children} </div>
      </div>
    </div>
  </div>
  {isOpen && (<div modal-backdrop="" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>)}
</>);

export default Modal;