import CardsList from './CardsList';
import { updateColumnName, createCard } from '../../api';
import { useAppContext } from '../../context/app-context';
import './style.css';

const CardsListContainer = ({ cards, name, columnId }) => {
  const { currentUser, refreshDashboard } = useAppContext();

  const updateColumnNameHandler = async (newName) => {
    await updateColumnName(columnId, newName);
  };

  const createCardHandler = async (title) => {
    await createCard(title, columnId, currentUser);
    refreshDashboard();
  };

  return (
    <div className='cards-list-wrapper'>
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
