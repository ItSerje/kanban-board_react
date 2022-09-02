import { useState, useEffect } from 'react';
import { fetchCardById, updateCard, deleteCard } from '../../api';
import FullCard from './FullCard';
import Spinner from 'react-bootstrap/Spinner';
import { useAppContext } from '../../context/app-context';

const FullCardContainer = ({ cardId, closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState(null);
  const [refreshCard, setRefreshCard] = useState(0);

  const { refreshDashboard } = useAppContext();

  const updateCardHandler = async (inputName, updatedValue) => {
    const updatedCard = { ...card, [inputName]: updatedValue.trim() };
    await updateCard(updatedCard);
    setRefreshCard(refreshCard + 1);
    await refreshDashboard();
  };

  const deleteCardHandler = async (id) => {
    await deleteCard(id);
    closeModal();
    await refreshDashboard();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const card = await fetchCardById(cardId);
      setCard(card);
      setIsLoading(false);
    };
    fetchData();
  }, [cardId, refreshCard]);

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
