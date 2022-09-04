import { useState, useEffect } from 'react';
import { fetchCardById, updateCard, deleteCard } from '../../api';
import FullCard from './FullCard';
import CommentsListContainer from '../commentsList/CommentsListContainer';
import Spinner from 'react-bootstrap/Spinner';

const FullCardContainer = ({ cardId, columnName, closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState(null);
  const [refreshingCounter, setRefreshingCounter] = useState(0);

  const refreshCard = () => {
    setRefreshingCounter(refreshingCounter + 1);
  };

  const updateCardHandler = async (card) => {
    await updateCard(card);
    refreshCard();
  };

  const deleteCardHandler = async (id) => {
    await deleteCard(id);
    closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const card = await fetchCardById(cardId);
      setCard(card);
      setIsLoading(false);
    };
    fetchData();
  }, [cardId, refreshingCounter]);

  if (isLoading) {
    return <Spinner animation='border' variant='primary' className='spinner' />;
  }
  return (
    <>
      <FullCard
        card={card}
        columnName={columnName}
        closeModal={closeModal}
        updateCardHandler={updateCardHandler}
        deleteCardHandler={deleteCardHandler}
      ></FullCard>
      <CommentsListContainer
        comments={card.comments}
        cardId={cardId}
        refreshCard={refreshCard}
      />
    </>
  );
};

export default FullCardContainer;
