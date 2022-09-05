import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import autoResizeTextarea from '../../utils/autoresize-textarea';
import {
  FaRegWindowMaximize,
  FaAlignLeft,
  FaRegTrashAlt,
} from 'react-icons/fa';
import { Icard } from '../../models/dashboard.model';
import './style.css';

interface IFullCardProps {
  card: Icard;
  columnName: string;
  updateCardHandler: (card: Icard) => Promise<void>;
  deleteCardHandler: (id: string) => Promise<void>;
}

const FullCard: React.FC<IFullCardProps> = ({
  card,
  columnName,
  updateCardHandler,
  deleteCardHandler,
}): JSX.Element => {
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>(card.title);
  const [textValue, setTextValue] = useState<string>(card.text);

  const submitHandler: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (e) => {
    e.preventDefault();
    const updatedCard: Icard = {
      ...card,
      title: titleValue.trim(),
      text: textValue.trim(),
    };
    await updateCardHandler(updatedCard);
  };

  useEffect(
    () =>
      document
        .querySelectorAll('.textarea-autosize')
        .forEach((el: Element | HTMLTextAreaElement) => autoResizeTextarea(el)),
    [titleValue, textValue, isEditingMode]
  );

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Row className='full-card__section full-card__list-author-row'>
          <Col>
            <p>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              in list <a href='#'>{columnName}</a>
            </p>
          </Col>
          <Col className='card-form__card-author-container'>
            <span>
              Author:{' '}
              <span className='full-card__card-author'>{card.author}</span>
            </span>
          </Col>
        </Row>
        <Row className='full-card__section'>
          <Col className='card-form__icon-column'>
            <span className='card-form__icon-span'>
              <FaRegWindowMaximize className='full-card-icon' />
            </span>
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
                className='textarea-autosize card-form__title-textarea'
              />
            </Row>
          </Col>
        </Row>
        <Row className='full-card__section'>
          <Col className='card-form__icon-column'>
            <span className='card-form__icon-span'>
              <FaAlignLeft className='full-card-icon' />
            </span>
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
                  variant='primary'
                  className='textarea-autosize-btn'
                  //   onClick={submitHandler}
                >
                  Save
                </Button>
                <Button
                  variant='secondary'
                  className='textarea-autosize-btn'
                  onClick={() => {
                    setTitleValue(card.title);
                    setTextValue(card.text);
                    setIsEditingMode(false);
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col className='full-card-form__delete-btn-container'>
                <span
                  className='card-form__delete-btn'
                  onClick={() => deleteCardHandler(card.id)}
                >
                  <FaRegTrashAlt className='full-card-form__delete-icon' />
                </span>
              </Col>
            </Row>
          )}
        </Row>
      </Form>
    </Container>
  );
};

export default FullCard;
