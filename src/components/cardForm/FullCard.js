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

  const submitHandler = (e) => {
    e.preventDefault();
    const newCard = { ...card, title: titleValue, text: textValue };
    updateCardHandler(newCard);
  };

  useEffect(
    () =>
      document.querySelectorAll('.textarea-autosize').forEach((el) => {
        console.log(el);
        autoResizeTextarea(el);
      }),
    [titleValue, textValue, isEditingMode]
  );

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Row className='full-card__section'>
          <Col className='card-form__icon-column'></Col>
          <Col>
            <Row className='card-form__card-author-container'>
              <span>
                Author:{' '}
                <span className='full-card__card-author'>{card.author}</span>
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
              <h5>Title</h5>
            </Row>
            <Row>
              <Form.Control
                as='textarea'
                rows={1}
                value={titleValue}
                onChange={(e) => {
                  setTitleValue(e.target.value);
                }}
                required
                disabled={isEditingMode ? false : true}
                className='textarea-autosize'
              />
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

              <Form.Control
                as='textarea'
                rows={1}
                value={textValue}
                onChange={(e) => {
                  setTextValue(e.target.value);
                }}
                disabled={isEditingMode ? false : true}
                className='textarea-autosize textarea__text'
              />
            </Row>
          </Col>
        </Row>

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
      </Form>
    </Container>
  );
};

export default FullCard;
