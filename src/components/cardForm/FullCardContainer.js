import { useState, useEffect } from 'react';
import { fetchCardById } from '../../api';
import FullCard from './FullCard';
import Spinner from 'react-bootstrap/Spinner';

const FullCardContainer = ({ cardId, closeModal }) => {
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  return <FullCard card={card} closeModal={closeModal}></FullCard>;
};

export default FullCardContainer;
