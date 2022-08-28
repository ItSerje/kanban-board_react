import React from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapCard from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './style.css';

const Card = ({ card, openCardHandler }) => {
  const { commentsCounter, title } = card;

  return (
    <BootstrapCard style={{ width: '18rem' }} onClick={openCardHandler}>
      {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
      <BootstrapCard.Body>
        <BootstrapCard.Title>{title}</BootstrapCard.Title>
        {/* <BootstrapCard.Text>{author}</BootstrapCard.Text> */}
        {/* <Button variant='primary' onClick={addCardHandler}>
          Add card
        </Button> */}

        {/* maybe the below is worth to be a separate component? */}
        {/* basides there is an option to use react-bootstrap Badge and/or ListGroup */}
        <div className='card-badges'>
          <div className='card-badge' title='Comments'>
            <span className='card-badge-icon'></span>
            <span className='card-badge-text'>{commentsCounter}</span>
          </div>
        </div>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
