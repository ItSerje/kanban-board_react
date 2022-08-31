import CardsListContainer from '../cardsList/CardsListContainer';
import './style.css';

const Dashboard = ({ dashboard, refreshDashboard }) => {
  const filterCards = (columnCards) => {
    const filteredCards = dashboard.cards.filter((card) =>
      columnCards.includes(card.id)
    );
    return filteredCards;
  };

  return (
    <>
      {dashboard && (
        <section className='dashboard'>
          {dashboard.columns.map((column) => {
            const { id, name, cards: columnCards } = column;
            const filteredCards = filterCards(columnCards);
            return (
              <CardsListContainer
                cards={filteredCards}
                key={id}
                name={name}
                columnId={id}
                refreshDashboard={refreshDashboard}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default Dashboard;
