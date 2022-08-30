import CardsListContainer from '../cardsList/CardsListContainer';
import './style.css';

const Dashboard = ({ dashboard, refreshDashboard }) => {
  return (
    <main>
      {dashboard && (
        <section className='dashboard'>
          {dashboard.columns.map((column) => {
            const { id, name, cards } = column;
            return (
              <CardsListContainer
                cards={cards}
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
