import { useState } from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import Modal from '../modal/Modal';
import FullCardContainer from '../cardForm/FullCardContainer';

import './style.css';

const Card = ({ card, columnName }) => {
  const { id, comments, title } = card;

  const [isModalShown, setIsModalShown] = useState(false);
  const closeModal = () => setIsModalShown(false);

  return (
    <>
      {isModalShown && (
        <Modal
          showHeader={true}
          closeModal={closeModal}
          headerTitle='Card Details'
        >
          <FullCardContainer
            cardId={id}
            columnName={columnName}
            closeModal={closeModal}
          />
        </Modal>
      )}
      <BootstrapCard onClick={() => setIsModalShown(true)}>
        {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
        <span className='card-edit-icon'></span>
        <BootstrapCard.Body className='card-list-card-body'>
          <BootstrapCard.Title as='div'>{title}</BootstrapCard.Title>
          {/* <BootstrapCard.Text>{author}</BootstrapCard.Text> */}
          {/* <Button variant='primary' onClick={addCardHandler}>
          Add card
        </Button> */}
        </BootstrapCard.Body>

        <BootstrapCard.Footer>
          {/* <small className='text-muted'>Last updated 3 mins ago</small> */}

          {/* maybe the below is worth to be a separate component? */}
          {/* basides there is an option to use react-bootstrap Badge and/or ListGroup */}

          <div className='card-badge' title='Comments'>
            <span className='card-badge-icon'></span>
            <span className='card-badge-text'>{comments.length}</span>
          </div>
        </BootstrapCard.Footer>
      </BootstrapCard>
    </>
  );
};

export default Card;
