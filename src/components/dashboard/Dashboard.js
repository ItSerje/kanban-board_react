import CardsListContainer from '../cardsList/CardsListContainer';
import './style.css';

const Dashboard = ({ dashboard, refreshDashboard, openCardHandler }) => {
  return (
    <>
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
                openCardHandler={openCardHandler}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default Dashboard;
