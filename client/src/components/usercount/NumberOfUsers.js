import React, { useContext } from 'react';
import { StateContext } from '../../App';
import './styles.css';

const NumberOfUsers = () => {
  const { numOnline } = useContext(StateContext);

  return <div className="top-right">{`${numOnline} users online`}</div>;
};

export default NumberOfUsers;
