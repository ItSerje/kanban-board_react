import React from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapCard from 'react-bootstrap/Card';
import './style.css';

const Card2 = ({ card, addCardHandler }) => {
  const { author, text } = card;

  return (
    <BootstrapCard style={{ width: '18rem' }}>
      {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
      <BootstrapCard.Body>
        <BootstrapCard.Title>{text}</BootstrapCard.Title>
        <BootstrapCard.Text>{author}</BootstrapCard.Text>
        <Button variant='primary' onClick={addCardHandler}>
          Add card
        </Button>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card2;
