import React, { useState } from 'react';
import LoginModal from '../loginmodal/LoginModal';
import NameHolder from '../component/nameholder/NameHolder';

export const StateContext = React.createContext({});

const Screen = () => {
  // Global variables
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const contextProviderValue = {
    name,
    setName,
    image,
    setImage,
  };

  return (
    <div className="app-body">
      <StateContext.Provider value={contextProviderValue}>
        <NameHolder />
        <LoginModal />
      </StateContext.Provider>
    </div>
  );
};

export default Screen;
