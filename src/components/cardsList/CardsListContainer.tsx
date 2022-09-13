import React from 'react';
import CardsList from './CardsList';
import { updateColumnName, createCard } from '../../api';
import { useAppContext } from '../../context/app-context';
import './style.css';
import { ICard } from '../../models/dashboard.model';

interface ICardsListContainerProps {
  cards: ICard[];
  name: string;
  columnId: string;
}

const CardsListContainer: React.FC<ICardsListContainerProps> = ({
  cards,
  name,
  columnId,
}): JSX.Element => {
  const { currentUser, refreshDashboard } = useAppContext();

  const updateColumnNameHandler: (newName: string) => void = async (
    newName
  ) => {
    await updateColumnName(columnId, newName);
  };

  const createCardHandler: (title: string) => void = async (title) => {
    await createCard(title, columnId, currentUser);
    refreshDashboard?.();
  };

  return (
    <div className='cards-list__wrapper'>
      <CardsList
        cards={cards}
        name={name}
        updateColumnNameHandler={updateColumnNameHandler}
        createCardHandler={createCardHandler}
      />
    </div>
  );
};

export default CardsListContainer;
