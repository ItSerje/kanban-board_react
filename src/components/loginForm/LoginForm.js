import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';
import { useState } from 'react';
import { useAppContext } from '../../context/app-context';

const LoginForm = ({ closeModal }) => {
  const [validated, setValidated] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { setCurrentUser } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setCurrentUser(inputValue);
      closeModal();
    }
    setValidated(true);
  };

  return (
    <Form
      className='login-form'
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
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
  );
};

export default LoginForm;
