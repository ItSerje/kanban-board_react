import './style.css';
import CardsList from './CardsList';

const CardsListContainer = ({ cards, name, columnId }) => {
  return (
    <div className='cards-list-wrapper'>
      <CardsList cards={cards} name={name} columnId={columnId} />
    </div>
  );
};

export default CardsListContainer;
