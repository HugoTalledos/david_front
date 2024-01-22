import React, { useContext, useMemo, useState } from 'react';
import alertMessageContext from '../context/notification-context';
import {ReactComponent as CloseSVG} from '../assets/icons/close.svg';
import {ReactComponent as SuccessSVG} from '../assets/icons/success.svg';
import {ReactComponent as ErrorSVG} from '../assets/icons/error.svg';
import {ReactComponent as WarningSVG} from '../assets/icons/warning.svg';
import {ReactComponent as DefaultSVG} from '../assets/icons/default.svg';


const Notification = () => {
  const { data, dispatchData } = useContext(alertMessageContext);
  const [notificationTimeout, setNotificationTimeout] = useState(null);
  useMemo(() => {
    if (data.show) {
      clearTimeout(notificationTimeout);
      setNotificationTimeout(setTimeout(() => {
        data.text = '';
        dispatchData();
      }, 4000));
    }
    // eslint-disable-next-line
  }, [data]);

  const renderIcon = {
    success: <SuccessSVG />,
    danger: <ErrorSVG />,
    warning: <WarningSVG />,
    default: <DefaultSVG />,
  };

  const color = {
    success: 'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200',
    danger: 'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200',
    warning: 'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200',
    default: 'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200'
  }

  return (
  <div id="toast-success" className={`${!data.show ? 'hidden' : ''} flex items-center fixed top-5 max-[767px]:top-20 right-5 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`} role="alert">
    <div className={color[data.type]}>
        { renderIcon[data.type] }
        <span className="sr-only">Check icon</span>
    </div>
    <div className="ml-3 text-sm font-normal">{ data.text }</div>
    <button onClick={() => {
            clearTimeout(notificationTimeout);
            data.text = '';
            dispatchData();
          }}
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span className="sr-only">Close</span>
        <CloseSVG />
    </button>
</div>);
};

export default Notification;
