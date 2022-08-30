import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

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
        <Modal.Title>Please enter your name to sign in</Modal.Title>
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
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
