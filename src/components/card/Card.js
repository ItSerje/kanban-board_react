import BootstrapCard from 'react-bootstrap/Card';
import './style.css';

const Card = ({ card, openCardHandler }) => {
  const { commentsCounter, title } = card;

  return (
    <BootstrapCard onClick={openCardHandler}>
      {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
      <span className='card-edit-icon'></span>
      <BootstrapCard.Body>
        <BootstrapCard.Title>{title}</BootstrapCard.Title>
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
          <span className='card-badge-text'>{commentsCounter}</span>
        </div>
      </BootstrapCard.Footer>
    </BootstrapCard>
  );
};

export default Card;
