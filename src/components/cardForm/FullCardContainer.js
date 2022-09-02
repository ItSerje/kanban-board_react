import { useState, useEffect } from 'react';
import { fetchCardById } from '../../api';
import FullCard from './FullCard';
import Spinner from 'react-bootstrap/Spinner';
import { useAppContext } from '../../context/app-context';

const FullCardContainer = ({ cardId, closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState(null);

  const { refreshDashboard } = useAppContext();

  const updateCardHandler = (updatedCard) => {
    // updateCard() // api
    // refreshDashboard();
  };

  const deleteCardHandler = (updatedCard) => {
    // updateCard() // api
    // refreshDashboard();
  };

  useEffect(() => {
    const fetchData = async () => {
      const card = await fetchCardById(cardId);
      setCard(card);
      setIsLoading(false);
    };
    fetchData();
  }, [cardId]);

  if (isLoading) {
    return <Spinner animation='border' variant='primary' className='spinner' />;
  }
  return (
    <FullCard
      card={card}
      closeModal={closeModal}
      updateCardHandler={updateCardHandler}
      deleteCardHandler={deleteCardHandler}
    ></FullCard>
  );
};

export default FullCardContainer;
