import React, { useContext, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import './styles.css';
import ListOfImages from '../components/picturecontainer/ListOfImages';
import { StateContext } from '../App';
import io from 'socket.io-client';

const LoginModal = () => {
  const socket = io('http://localhost:5000', {
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': 'abcd',
    },
  });

  const { name, image, setName, setImage } = useContext(StateContext);
  const [show, setShow] = useState(true);

  const handleSubmit = (event) => {
    setShow(false);
    event.preventDefault();
    // Set initialized field to prevent modal from showing up again
    window.localStorage.setItem('initialized', 'yes');
    // Name set
    window.localStorage.setItem('name', name);
    const newUser = {
      userName: name,
      avatar: image,
    };
    socket.emit('inputUser', newUser);
  };

  const handleChange = (event) => setName(event.target.value);

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      size="lg"
      dialogClassName="modal-styles"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="modal-styles"
    >
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Modal.Title id="modal-header">
          <p>What should we call you?</p>
        </Modal.Title>
        <input
          required
          type="text"
          placeholder="input your name"
          onChange={handleChange}
          className="name-box"
        />
        <div className="row-container">
          <p>Pick your avatar</p>
          <ListOfImages currentSelected={image} handleSelection={setImage} />
        </div>
        <Modal.Footer id="modal-footer">
          <button type="submit">Get chatting!</button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LoginModal;
