import React from 'react';
import PropTypes from 'prop-types';
import './Load.css';

const Load = ({ fullScreen }) => {

  return (
    <>
      <section className={`container__load ${fullScreen ? 'fullScreen' : ''}`}>
        <div className="spinner" />
      </section>
    </>);
};

Load.protoType = {
  fullScreen: PropTypes.Boolean,
};

export default Load;
