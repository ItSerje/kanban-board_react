import { useState, useRef } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { useAppContext } from '../../context/app-context';
import TextareaForm from '../textarea/TextareaForm';
import './style.css';

const CardForm = ({ card, closeModal }) => {
  const [isTitleEdited, setIsTitleEdited] = useState(false);
  const [isTextEdited, setIsTextEdited] = useState(false);

  const closeAllTextAreas = () => {
    setIsTitleEdited();
    setIsTextEdited();
  };

  const { currentUser } = useAppContext();

  const handleUpdate = (e) => {};

  const handleDelete = (e) => {
    // delete request to api
    closeModal();
  };

  console.log(typeof currentUser, typeof card.author);

  return (
    <Container>
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
            {!isTitleEdited && (
              <h2
                onClick={() => {
                  closeAllTextAreas();
                  setIsTitleEdited(true);
                }}
              >
                {card.title}
              </h2>
            )}
            {isTitleEdited && (
              <TextareaForm text={card.title} closeForm={closeAllTextAreas} />
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
            {!isTextEdited && (
              <p
                onClick={() => {
                  closeAllTextAreas();
                  setIsTextEdited(true);
                }}
              >
                {card.text}
              </p>
            )}
            {isTextEdited && (
              <TextareaForm text={card.text} closeForm={closeAllTextAreas} />
            )}
          </Row>
        </Col>
      </Row>
      <Row className='full-card__section'>
        <Col className='card-form__icon-column'></Col>
        <Col className='card-form__delete-btn-container'>
          <button className='card-form__delete-btn' onClick={handleDelete}>
            🗑️
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default CardForm;
