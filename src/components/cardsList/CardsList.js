import { useState, useEffect } from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import BootstrapForm from 'react-bootstrap/Form';
import autoResizeTextarea from '../../utils/autoresize-textarea';
import Card from '../card/Card';
import './style.css';

const CardsList = ({ cards, name, updateColumnNameHandler }) => {
  const [isNameEditMode, setNameEditMode] = useState(false);
  const [columnName, setColumnName] = useState(name);

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
                autoFocus
                className='card-list__column-name-input'
                value={columnName}
                onFocus={(e) => {
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
        ) : (
          name
        )}
      </BootstrapCard.Header>
      <BootstrapCard.Body bsPrefix='cards-list-body'>
        {cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </BootstrapCard.Body>
      <BootstrapCard.Footer bsPrefix='cards-list-footer'>
        + Add a card
      </BootstrapCard.Footer>
    </BootstrapCard>
  );
};

export default CardsList;
