import { useState } from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import Modal from '../modal/Modal';
import FullCardContainer from '../fullCard/FullCardContainer';

import './style.css';
import { FaRegEdit, FaRegComment } from 'react-icons/fa';
import { useAppContext } from '../../context/app-context';

const Card = ({ card, columnName }) => {
  const { id, comments, title } = card;
  const [isIconShown, setIsIconShown] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const { refreshDashboard } = useAppContext();
  const closeModal = () => {
    setIsModalShown(false);
    refreshDashboard();
  };

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
      <BootstrapCard
        onClick={() => setIsModalShown(true)}
        onMouseEnter={() => setIsIconShown(true)}
        onMouseLeave={() => setIsIconShown(false)}
      >
        <FaRegEdit className={isIconShown ? 'icon-edit' : 'icon-edit hidden'} />
        <BootstrapCard.Body className='card-list-card-body'>
          <BootstrapCard.Title as='div'>{title}</BootstrapCard.Title>
        </BootstrapCard.Body>
        {comments.length > 0 && (
          <BootstrapCard.Footer>
            <div className='card-badge'>
              <FaRegComment className='icon-comment' title='Comments' />
              <span className='card-badge-text' title='Comments'>
                {comments.length}
              </span>
            </div>
          </BootstrapCard.Footer>
        )}
      </BootstrapCard>
    </>
  );
};

export default Card;
