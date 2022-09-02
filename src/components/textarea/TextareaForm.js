import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css';
import autoResizeTextarea from '../../utils/autoresize-textarea';

const TextareaForm = ({ text, placeholder = '', callback = null }) => {
  console.log(text);
  const [inputValue, setInputValue] = useState(text);
  const el = useRef(null);

  useEffect(() => {
    autoResizeTextarea(el.current);
  }, [inputValue]);

  return (
    <>
      <Form.Control
        as='textarea'
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
          callback(inputValue);
        }}
      >
        Save
      </Button>
      <Button
        variant='secondary'
        className='textarea-autosize-btn'
        onClick={callback}
      >
        Cancel
      </Button>
    </>
  );
};

export default TextareaForm;
