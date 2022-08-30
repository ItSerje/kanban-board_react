import { useState, useRef } from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import BootstrapForm from 'react-bootstrap/Form';
import './style.css';
import Card from '../card/Card';
import { useDashboardContext } from '../../context/dashboard_context';

const CardsList = ({ cards, name, columnId }) => {
  const [isNameEditMode, setNameEditMode] = useState(false);
  const { updateDashboardColumnName } = useDashboardContext();
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
                  updateDashboardColumnName(columnId, e.target.value);
                }}
                onKeyDown={(e) => {
                  if (['Enter', 'NumpadEnter', 'Escape'].includes(e.key)) {
                    updateDashboardColumnName(columnId, e.target.value);
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
        {Object.keys(cards).map((key) => {
          const card = cards[key];
          return <Card card={card} key={card.id} />;
        })}
      </BootstrapCard.Body>
      <BootstrapCard.Footer bsPrefix='cards-list-footer'>
        + Add a card
      </BootstrapCard.Footer>
    </BootstrapCard>
  );
};

export default CardsList;
