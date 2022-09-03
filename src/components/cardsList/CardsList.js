import { useState, useEffect } from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import BootstrapForm from 'react-bootstrap/Form';
import autoResizeTextarea from '../../utils/autoresize-textarea';
import TextareaForm from '../textareaForm/TextareaForm';

import Card from '../card/Card';
import './style.css';

const CardsList = ({
  cards,
  name,
  updateColumnNameHandler,
  createCardHandler,
}) => {
  const [isNameEditMode, setNameEditMode] = useState(false);
  const [isAddCardMode, setIsAddCardMode] = useState(false);
  const [columnName, setColumnName] = useState(name);

  return (
    <BootstrapCard bsPrefix='cards-list'>
      <BootstrapCard.Header
        bsPrefix='cards-list-header'
        onClick={() => {
          setNameEditMode(true);
        }}
      >
        {!isNameEditMode ? (
          <div className='cards-list__column-name'>{name}</div>
        ) : (
          <BootstrapForm>
            <BootstrapForm.Group controlId='exampleForm.ControlTextarea1'>
              <BootstrapForm.Control
                as='textarea'
                rows={1}
                autoFocus
                className='card-list__column-name-input'
                value={columnName}
                onFocus={(e) => {
                  autoResizeTextarea(e.target);
                  e.target.select();
                }}
                onChange={(e) => {
                  autoResizeTextarea(e.target);
                  setColumnName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (['Enter', 'NumpadEnter', 'Escape'].includes(e.key)) {
                    updateColumnNameHandler(columnName);
                    setNameEditMode(false);
                  }
                }}
                onBlur={() => {
                  updateColumnNameHandler(columnName);
                  setNameEditMode(false);
                }}
              />
            </BootstrapForm.Group>
          </BootstrapForm>
        )}
      </BootstrapCard.Header>
      <BootstrapCard.Body bsPrefix='cards-list-body'>
        {cards.map((card) => (
          <Card card={card} key={card.id} columnName={name} />
        ))}
      </BootstrapCard.Body>
      <BootstrapCard.Footer bsPrefix='cards-list-footer'>
        {!isAddCardMode && (
          <div
            className='cards-list__add-card'
            onClick={() => {
              setIsAddCardMode(true);
            }}
          >
            + Add a card
          </div>
        )}
        {isAddCardMode && (
          <TextareaForm
            placeholder='Enter your card title'
            cancelCallback={() => setIsAddCardMode(false)}
            submitCallback={createCardHandler}
          />
        )}
      </BootstrapCard.Footer>
    </BootstrapCard>
  );
};

export default CardsList;
