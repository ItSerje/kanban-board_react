import { useState, useRef } from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import BootstrapForm from 'react-bootstrap/Form';
import './style.css';
import Card from '../card/Card';

const CardsList = ({ cards, name, columnId, openCardHandler }) => {
  const [isNameEditMode, setNameEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(name);

  return (
    <BootstrapCard bsPrefix='cards-list'>
      <BootstrapCard.Header
        bsPrefix='cards-list-header'
        onClick={() => {
          setNameEditMode(true);
        }}
      >
        {isNameEditMode ? (
          <BootstrapForm>
            <BootstrapForm.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <BootstrapForm.Control
                as='textarea'
                rows={1}
                autoFocus
                value={inputValue}
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (['Enter', 'NumpadEnter', 'Escape'].includes(e.key)) {
                    setNameEditMode(false);
                  }
                }}
                onBlur={() => {
                  setNameEditMode(false);
                }}
              />
            </BootstrapForm.Group>
          </BootstrapForm>
        ) : (
          name
        )}
      </BootstrapCard.Header>
      <BootstrapCard.Body bsPrefix='cards-list-body'>
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            columnId={columnId}
            openCardHandler={openCardHandler}
          />
        ))}
      </BootstrapCard.Body>
      <BootstrapCard.Footer bsPrefix='cards-list-footer'>
        + Add a card
      </BootstrapCard.Footer>
    </BootstrapCard>
  );
};

export default CardsList;
