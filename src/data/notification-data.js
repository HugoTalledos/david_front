import React, { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import alertMessagecontext from '../context/notification-context';

const reducer = (data, action) => {
  if (action && action.text && action.text.length > 0) {
    return {
      ...data, show: true, text: action.text, type: action.type,
    };
  }
  return { ...data, show: false };
};

const AlertMessageDataHolder = ({ children }) => {
  const [data, dispatchData] = useReducer(reducer, { show: false, text: '', type: '' });
  const value = useMemo(() => ({ data, dispatchData }), [data]);
  return (
    <alertMessagecontext.Provider value={value}>
      {children}
    </alertMessagecontext.Provider>
  );
};
AlertMessageDataHolder.propTypes = { children: PropTypes.node };
export default AlertMessageDataHolder;
