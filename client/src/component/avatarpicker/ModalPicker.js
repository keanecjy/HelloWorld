import React, { useContext, useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import './styles.css';
import '../picturecontainer/styles.css';
import ListOfImages from '../picturecontainer/ListOfImages';
import { listOfImages } from '../picturecontainer/imagesList';
import { StateContext } from "../../main-app/Screen";

const ModalPicker = () => {

  const {image, setImage} = useContext(StateContext);
  
  const [isPickAvatar, showAvatarPicker] = useState(false);

  const handleSelection = (pic) => {
    setImage(pic);
    showAvatarPicker(false);
  };

  return (
    <>
      <img
        src={listOfImages[image]}
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
        <ListOfImages currentSelected={image} handleSelection={handleSelection} />
      </Modal>
    </>
  );
};

export default ModalPicker;
