import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

import React from 'react';

const LoginModal = ({ modalShow, closeModalHandler, loginHandler }) => {
  return (
    <Modal
      show={modalShow}
      onHide={closeModalHandler}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Please enter your name to login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModalHandler}>
          Close
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            loginHandler();
            closeModalHandler();
          }}
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
