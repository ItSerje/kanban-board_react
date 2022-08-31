import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const CardForm = ({ card, closeCardFormHandler }) => {
  const [inputValue, setInputValue] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // signInUser(inputValue);
      closeCardFormHandler();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
        <Form.Label>Title: {card.title}</Form.Label>
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
      <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
        <Form.Label>Text</Form.Label>
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
      {/* comments component */}
      <Button type='submit' variant='primary'>
        Sign In
      </Button>
    </Form>
  );
};

export default CardForm;
