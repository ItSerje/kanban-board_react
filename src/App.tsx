import { useState } from 'react';
import logo from './logo.svg';
import BootstrapContainer from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/navbar/Navbar';
import CardsListContainer from './components/cardsList/CardsListContainer';
import LoginModal from './components/LoginModal/LoginModal';
import { useDashboardContext } from './context/dashboard_context';

function App() {
  const [modalShow, setModalShow] = useState(true);
  const closeModalHandler = () => setModalShow(false);
  const loginHandler = () => console.log('login');

  const { dashboard } = useDashboardContext();

  return (
    <main>
      {/* <Navbar /> */}
      <section className='dashboard-container'>
        <BootstrapContainer bsPrefix='dashboard'>
          <LoginModal
            modalShow={modalShow}
            closeModalHandler={closeModalHandler}
            loginHandler={loginHandler}
          />
          {dashboard.columns.map(
            (column: { id: any; name: any; cards: any }) => {
              const { id, name, cards } = column;
              return (
                <CardsListContainer
                  cards={cards}
                  key={id}
                  name={name}
                  columnId={id}
                />
              );
            }
          )}
        </BootstrapContainer>
      </section>
    </main>
  );
}

export default App;
