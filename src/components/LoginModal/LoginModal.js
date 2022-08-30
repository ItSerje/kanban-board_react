import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';
import { signInUser } from '../../api';
import { useState } from 'react';

const LoginModal = ({ modalShow, closeModalHandler }) => {
  const [validated, setValidated] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      signInUser(inputValue);
      closeModalHandler();
    }
    setValidated(true);
  };

  return (
    <Modal
      show={modalShow}
      //   onHide={keepModalOpen}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title>Please enter your name to sign in</Modal.Title>
      </Modal.Header> */}
      <Modal.Body className='sign-in-modal'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Please enter your name to sign in</Form.Label>
            <Form.Control
              type='text'
              name='name'
              autoFocus
              required
              placeholder='Test users: John, Mary, Chris, Mike'
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};

export default LoginModal;
