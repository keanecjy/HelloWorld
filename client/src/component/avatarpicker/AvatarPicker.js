import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import boy1 from './images/boy.svg';
import boy2 from './images/bussiness-man.svg';
import boy3 from './images/man.svg';
import girl1 from './images/girl.svg';
import girl2 from './images/girl2.svg';
import girl3 from './images/woman.svg';
import './styles.css';
import ListOfImages from './ListOfImages';

const AvatarPicker = () => {
  const [isPickAvatar, showAvatarPicker] = useState(false);
  const firstListOfImages = [boy1, boy2, boy3];
  const secondListOfImages = [girl1, girl2, girl3];
  const [currentAvatar, setAvatar] = useState(() => boy1);

  const handleSelection = (pic) => {
    setAvatar(pic);
    showAvatarPicker(false);
  };

  return (
    <>
      <img
        src={currentAvatar}
        alt="none"
        className="image-style"
        onClick={() => showAvatarPicker(true)}
      />
      <Modal
        show={isPickAvatar}
        onHide={() => showAvatarPicker(false)}
        size="lg"
        dialogClassName="appear-on-left"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="modal-images">
          <ListOfImages listOfImages={firstListOfImages} handleSelection={handleSelection} />
          <ListOfImages listOfImages={secondListOfImages} handleSelection={handleSelection} />
        </div>
      </Modal>
    </>
  );
};

export default AvatarPicker;
