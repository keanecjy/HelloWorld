import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import './styles.css';
import AvatarPicker from '../component/avatarpicker/AvatarPicker';

const LoginModal = () => {
  const [show, setShow] = useState(true);
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    setShow(false);
    event.preventDefault();
    window.localStorage.setItem('name', name);
  };

  const handleChange = (val) => setName(val);

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
          <AvatarPicker />
        </div>
        <Modal.Footer id="modal-footer">
          <button type="submit">Get chatting!</button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LoginModal;
