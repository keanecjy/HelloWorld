import React, { useState } from 'react';
import LoginModal from './LoginModal';

const Screen = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="app-body">
      <LoginModal show={show} onHide={() => setShow(false)} />
    </div>
  );
};

export default Screen;
