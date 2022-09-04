import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import './style.css';
import autoResizeTextarea from '../../utils/autoresize-textarea';

const TextareaForm = ({
  text = '',
  placeholder = '',
  cancelCallback = null,
  submitCallback = null,
  isEditingMode = true,
}) => {
  const initialInputValue = text;
  const [inputValue, setInputValue] = useState(text);

  return (
    <>
      <Row className='textarea-autosize__row'>
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
      </Row>
      {isEditingMode && (
        <Row className='textarea-autosize-btns textarea-autosize__row'>
          <Col>
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
              onClick={() => {
                setInputValue(initialInputValue);
                cancelCallback();
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TextareaForm;
