import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css';

const TextareaForm = ({
  name = null,
  text,
  placeholder = '',
  closeForm,
  callback = null,
}) => {
  console.log(text);
  const [inputValue, setInputValue] = useState(text);
  const el = useRef(null);

  const autoResizeTextarea = () => {
    el.current.style.height = 'auto';
    el.current.style.height = el.current.scrollHeight + 'px';
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [inputValue]);

  return (
    <>
      <Form.Control
        as='textarea'
        name={name}
        ref={el}
        autoFocus
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className='textarea-autosize'
      />
      <Button
        variant='primary'
        className='textarea-autosize-btn'
        onClick={() => {
          callback(name, inputValue);
        }}
      >
        Save
      </Button>
      <Button
        variant='secondary'
        className='textarea-autosize-btn'
        onClick={closeForm}
      >
        Cancel
      </Button>
    </>
  );
};

export default TextareaForm;
