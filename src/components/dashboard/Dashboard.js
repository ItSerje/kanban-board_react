import CardsListContainer from '../cardsList/CardsListContainer';
import './style.css';

const Dashboard = ({ dashboard, refreshDashboard }) => {
  console.log(dashboard);
  const filterCards = (columnCards) => {
    const filteredCards = dashboard.cards.filter((card) =>
      columnCards.includes(card.id)
    );
    return filteredCards;
  };

  return (
    <main>
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
    </main>
  );
};

export default Dashboard;
