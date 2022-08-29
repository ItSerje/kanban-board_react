import { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CardsListContainer from './components/cardsList/CardsListContainer';
import LoginModal from './components/LoginModal/LoginModal';
import { useDashboardContext } from './context/dashboard_context';

function App() {
  const [modalShow, setModalShow] = useState(true);
  const closeModalHandler = () => setModalShow(false);
  const loginHandler = () => console.log('login');

  const { dashboard } = useDashboardContext();

  return (
    <section className='dashboard'>
      <>
        <LoginModal
          modalShow={modalShow}
          closeModalHandler={closeModalHandler}
          loginHandler={loginHandler}
        />
        {Object.keys(dashboard.columns).map((key) => {
          const column: { [index: string]: any } = dashboard.columns[key];
          const { id, name, cards } = column;
          return (
            <CardsListContainer
              cards={cards}
              key={id}
              name={name}
              columnId={id}
            />
          );
        })}
      </>
    </section>
  );
}

export default App;
