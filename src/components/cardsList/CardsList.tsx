import React, { useState } from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import BootstrapForm from 'react-bootstrap/Form';
import autoResizeTextarea from '../../utils/autoresize-textarea';
import TextareaForm from '../textareaForm/TextareaForm';
import { Icard } from '../../models/dashboard.model';
import Card from '../card/Card';
import './style.css';

interface ICardsListProps {
  cards: Icard[];
  name: string;
  updateColumnNameHandler: (newName: string) => void;
  createCardHandler: (title: string) => void;
}

const CardsList: React.FC<ICardsListProps> = ({
  cards,
  name,
  updateColumnNameHandler,
  createCardHandler,
}): JSX.Element => {
  const [isNameEditMode, setNameEditMode] = useState<boolean>(false);
  const [isAddCardMode, setIsAddCardMode] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>(name);

  const handleColumnNameUpdate: () => void = () => {
    setColumnName(columnName.trim());
    updateColumnNameHandler(columnName);
    setNameEditMode(false);
  };

  return (
    <BootstrapCard bsPrefix='cards-list'>
      <BootstrapCard.Header
        bsPrefix='cards-list__header'
        onClick={() => {
          setNameEditMode(true);
        }}
      >
        {!isNameEditMode ? (
          <div className='cards-list__column-name'>{columnName}</div>
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
                    handleColumnNameUpdate();
                  }
                }}
                onBlur={() => {
                  handleColumnNameUpdate();
                }}
              />
            </BootstrapForm.Group>
          </BootstrapForm>
        )}
      </BootstrapCard.Header>
      <BootstrapCard.Body bsPrefix='cards-list__body'>
        {cards.map((card) => (
          <Card card={card} key={card.id} columnName={name} />
        ))}
        {isAddCardMode && (
          <TextareaForm
            placeholder='Enter your card title'
            cancelCallback={() => setIsAddCardMode(false)}
            submitCallback={createCardHandler}
          />
        )}
      </BootstrapCard.Body>
      <BootstrapCard.Footer bsPrefix='cards-list__footer'>
        {!isAddCardMode && (
          <div
            onClick={() => {
              setIsAddCardMode(true);
            }}
          >
            + Add a card
          </div>
        )}
      </BootstrapCard.Footer>
    </BootstrapCard>
  );
};

export default CardsList;
