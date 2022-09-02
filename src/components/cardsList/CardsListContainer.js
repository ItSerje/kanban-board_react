import CardsList from './CardsList';
import { updateColumnName } from '../../api';
import { useAppContext } from '../../context/app-context';
import './style.css';

const CardsListContainer = ({ cards, name, columnId }) => {
  const { refreshDashboard } = useAppContext();

  const updateColumnNameHandler = async (newName) => {
    await updateColumnName(columnId, newName);
    await refreshDashboard();
  };

  return (
    <div className='cards-list-wrapper'>
      <CardsList
        cards={cards}
        name={name}
        updateColumnNameHandler={updateColumnNameHandler}
      />
    </div>
  );
};

export default CardsListContainer;
