import CardsListContainer from '../cardsList/CardsListContainer';
import './style.css';

const Dashboard = ({
  dashboard,
  refreshDashboard,
  openCardHandler,
  showCardForm,
}) => {
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
                showCardForm={showCardForm}
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
