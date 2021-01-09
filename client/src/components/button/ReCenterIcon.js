import React from 'react';
import { MdGpsFixed } from 'react-icons/all';
import './styles.css';

const ReCenterIcon = ({ handleClick }) => {
  return (
    <button onClick={() => handleClick()} className="recenter-button">
      <MdGpsFixed color={'#ffffff'} size={'1.4em'} />
      RE-CENTER
    </button>
  );
};

export default ReCenterIcon;
