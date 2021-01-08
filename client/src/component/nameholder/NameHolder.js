import React, { useContext } from 'react';
import ModalPicker from '../avatarpicker/ModalPicker';
import { StateContext } from '../../App';

const NameHolder = () => {
  const { name, setName } = useContext(StateContext);

  return (
    <div className="row-flex">
      <ModalPicker />
      <input placeholder={name} onChange={(event) => setName(event.target.value)} />
    </div>
  );
};

export default NameHolder;
