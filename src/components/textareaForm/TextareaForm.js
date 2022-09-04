import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css';
import autoResizeTextarea from '../../utils/autoresize-textarea';

const TextareaForm = ({
  text = '',
  placeholder = '',
  cancelCallback = null,
  submitCallback = null,
  isEditingMode = true,
}) => {
  const [inputValue, setInputValue] = useState(text);

  return (
    <>
      <Form.Control
        as='textarea'
        rows={1}
        autoFocus
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          autoResizeTextarea(e.target);
          setInputValue(e.target.value);
        }}
        className='textarea-autosize'
        disabled={isEditingMode ? false : true}
      />
      {isEditingMode && (
        <>
          <Button
            variant='primary'
            className='textarea-autosize-btn'
            onClick={() => {
              setInputValue(inputValue.trim());
              submitCallback(inputValue.trim());
              cancelCallback();
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
      )}
    </>
  );
};

export default TextareaForm;
