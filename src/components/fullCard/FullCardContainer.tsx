import { useState, useEffect } from 'react';
import { fetchCardById, updateCard, deleteCard } from '../../api';
import FullCard from './FullCard';
import CommentsListContainer from '../commentsList/CommentsListContainer';
import Spinner from 'react-bootstrap/Spinner';
import { IFullCard } from '../../models/dashboard.model';

interface IFullCardContainerProps {
  cardId: string;
  closeModal: () => void;
}

const FullCardContainer: React.FC<IFullCardContainerProps> = ({
  cardId,
  closeModal,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [card, setCard] = useState<IFullCard | null>(null);
  const [refreshingCounter, setRefreshingCounter] = useState<number>(0);

  const refreshCard: () => void = () => {
    setRefreshingCounter(refreshingCounter + 1);
  };

  const updateCardHandler: (newCard: IFullCard) => Promise<void> = async (
    newCard
  ) => {
    setIsLoading(true);
    await updateCard(newCard);
    refreshCard();
  };

  const deleteCardHandler: (id: string) => Promise<void> = async (id) => {
    setIsLoading(true);
    await deleteCard(id);
    closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedCard = await fetchCardById(cardId);
      if (fetchedCard) {
        setCard(fetchedCard);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [cardId, refreshingCounter]);

  if (isLoading) {
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='primary' className='spinner' />
      </div>
    );
  }
  if (card) {
    return (
      <>
        <FullCard
          card={card}
          updateCardHandler={updateCardHandler}
          deleteCardHandler={deleteCardHandler}
        ></FullCard>
        <CommentsListContainer
          comments={card?.comments}
          cardId={cardId}
          refreshCard={refreshCard}
          activateCardSpinner={() => setIsLoading(true)}
        />
      </>
    );
  }
  return <></>;
};

export default FullCardContainer;
