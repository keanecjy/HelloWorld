import React from 'react';
import { Modal } from 'react-bootstrap';
import './styles.css';

const LoginModal = (props) => {
  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
      size="lg"
      dialogClassName="modal-styles"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="modal-styles"
    >
      <Modal.Title id="modal-header">
        <p>What should we call you?</p>
      </Modal.Title>
      <input placeholder="input your name" className="name-box" />
      <Modal.Footer id="modal-footer">
        <button onClick={() => props.onHide()}>Get chatting!</button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;