import './style.css';
import CardsList from './CardsList';

const CardsListContainer = ({
  cards,
  name,
  columnId,
  refreshDashboard,
  openCardHandler,
}) => {
  return (
    <div className='cards-list-wrapper'>
      <CardsList
        cards={cards}
        name={name}
        columnId={columnId}
        refreshDashboard={refreshDashboard}
        openCardHandler={openCardHandler}
      />
    </div>
  );
};

export default CardsListContainer;
