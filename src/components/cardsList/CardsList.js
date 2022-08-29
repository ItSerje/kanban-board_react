import React from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import './style.css';
import Card from '../card/Card';

const CardsList = ({ cards }) => {
  return (
    <div className='cards-list-wrapper'>
      <BootstrapCard className='cards-list'>
        <BootstrapCard.Header className='cards-list-header'>
          Column name
        </BootstrapCard.Header>
        <BootstrapCard.Body className='cards-list-body'>
          {cards.map((card) => (
            <>
              {console.log(card)}
              <Card card={card} key={card.id} />
            </>
          ))}
        </BootstrapCard.Body>
        <BootstrapCard.Footer className='cards-list-footer'>
          + Add a card
        </BootstrapCard.Footer>
      </BootstrapCard>
    </div>
  );
};

export default CardsList;
