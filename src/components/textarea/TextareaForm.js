import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css';
import autoResizeTextarea from '../../utils/autoresize-textarea';

const TextareaForm = ({
  text = '',
  placeholder = '',
  cancelCallback = null,
  submitCallback = null,
}) => {
  console.log(text);
  const [inputValue, setInputValue] = useState(text);

  return (
    <>
      <Form.Control
        as='textarea'
        autoFocus
        value={inputValue}
        onChange={(e) => {
          autoResizeTextarea(e.target);
          setInputValue(e.target.value);
        }}
        className='textarea-autosize'
      />
      <Button
        variant='primary'
        className='textarea-autosize-btn'
        onClick={() => {
          submitCallback(inputValue);
        }}
      >
        Save
      </Button>
      <Button
        variant='secondary'
        className='textarea-autosize-btn'
        onClick={cancelCallback}
      >
        Cancel
      </Button>
    </>
  );
};

export default TextareaForm;
