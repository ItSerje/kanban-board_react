import { useState } from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import Modal from '../modal/Modal';
import FullCardContainer from '../fullCard/FullCardContainer';
import './style.css';
import { FaRegEdit, FaRegComment } from 'react-icons/fa';
import { useAppContext } from '../../context/app-context';
import { ICard } from '../../models/dashboard.model';

interface ICardProps {
  card: ICard;
  columnName: string;
}

const Card: React.FC<ICardProps> = ({ card, columnName }): JSX.Element => {
  const { id, title, commentsNumber } = card;
  const [isIconShown, setIsIconShown] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const { refreshDashboard } = useAppContext();
  const closeModal: () => void = () => {
    setIsModalShown(false);
    refreshDashboard?.();
  };

  return (
    <>
      {isModalShown && (
        <Modal
          showHeader={true}
          closeModal={closeModal}
          headerTitle='Card Details'
          isModalShown={isModalShown}
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
        <FaRegEdit
          className={isIconShown ? 'card__icon-edit' : 'card__icon-edit hidden'}
        />
        <BootstrapCard.Body className='card__card-body'>
          <BootstrapCard.Title as='div'>{title}</BootstrapCard.Title>
        </BootstrapCard.Body>
        {commentsNumber > 0 && (
          <BootstrapCard.Footer>
            <div className='card__badge'>
              <FaRegComment className='card__icon-comment' title='Comments' />
              <span className='card-badge__text' title='Comments'>
                {commentsNumber}
              </span>
            </div>
          </BootstrapCard.Footer>
        )}
      </BootstrapCard>
    </>
  );
};

export default Card;
