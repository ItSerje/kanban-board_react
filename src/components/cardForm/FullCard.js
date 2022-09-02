import { useState, useEffect, useRef } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { useAppContext } from '../../context/app-context';
import { Form } from 'react-bootstrap';
import './style.css';
import autoResizeTextarea from '../../utils/autoresize-textarea';

const FullCard = ({ card, updateCardHandler, deleteCardHandler }) => {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [titleValue, setTitleValue] = useState(card.title);
  const [textValue, setTextValue] = useState(card.text);
  const { currentUser } = useAppContext(); // refactor to useAppContext || false
  const isOwner = card.author === currentUser ? true : false;
  const titleInputRef = useRef(null);
  const textInputRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const newCard = { ...card, title: titleValue, text: textValue };
    updateCardHandler(newCard);
  };

  useEffect(() => {
    if (isEditingMode) {
      autoResizeTextarea(titleInputRef.current);
      autoResizeTextarea(textInputRef.current);
    }
  }, [titleValue, textValue, isEditingMode]);

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Row className='full-card__section'>
          <Col className='card-form__icon-column'></Col>
          <Col>
            <Row className='card-form__card-author-container'>
              <span>
                Author:{' '}
                <span className='full-card__card-author'>
                  {card.author === currentUser ? 'You' : card.author}
                </span>
              </span>
            </Row>
          </Col>
        </Row>
        <Row className='full-card__section'>
          <Col className='card-form__icon-column'>
            <span>ic</span>
          </Col>
          <Col>
            <Row>
              {!isEditingMode && <h2>{card.title}</h2>}
              {isEditingMode && isOwner && (
                <Form.Control
                  as='textarea'
                  ref={titleInputRef}
                  value={titleValue}
                  onChange={(e) => {
                    setTitleValue(e.target.value);
                  }}
                  required
                  className='textarea-autosize'
                />
              )}
            </Row>
            {/* <Row>
                <p>
                  in list <a href='#'>{columnName}</a>
                </p>
              </Row> */}
          </Col>
        </Row>
        <Row className='full-card__section'>
          <Col className='card-form__icon-column'>
            <span>ic</span>
          </Col>
          <Col>
            <Row>
              <h5>Description</h5>
              {!isEditingMode && <p>{card.text}</p>}
              {isEditingMode && isOwner && (
                <Form.Control
                  as='textarea'
                  ref={textInputRef}
                  value={textValue}
                  onChange={(e) => {
                    setTextValue(e.target.value);
                  }}
                  className='textarea-autosize'
                />
              )}
            </Row>
          </Col>
        </Row>
        {isOwner && (
          <Row className='full-card__section'>
            <Col className='card-form__icon-column'></Col>
            {!isEditingMode && (
              <Col>
                <Button
                  variant='primary'
                  className='textarea-autosize-btn'
                  onClick={() => setIsEditingMode(true)}
                >
                  Edit
                </Button>
              </Col>
            )}
            {isEditingMode && (
              <Row>
                <Col className='full-card-form__save-cancel-btns-container'>
                  <Button
                    type='submit'
                    variant='success'
                    className='textarea-autosize-btn'
                  >
                    Save
                  </Button>
                  <Button
                    variant='secondary'
                    className='textarea-autosize-btn'
                    onClick={() => setIsEditingMode(false)}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col className='full-card-form__delete-btn-container'>
                  <button
                    className='card-form__delete-btn'
                    onClick={() => deleteCardHandler(card.id)}
                  >
                    🗑️
                  </button>
                </Col>
              </Row>
            )}
          </Row>
        )}
      </Form>
    </Container>
  );
};

export default FullCard;
