import { useState } from 'react';
import logo from './logo.svg';
import BootstrapContainer from 'react-bootstrap/Container';
import BootstrapNavbar from 'react-bootstrap/Navbar';
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
      <BootstrapNavbar>
        <BootstrapContainer>
          <BootstrapNavbar.Brand href='#home'>Dashboard</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle />
          <BootstrapNavbar.Collapse className='justify-content-end'>
            <BootstrapNavbar.Text>
              Signed in as: <a href='#login'>Mark Otto</a>
            </BootstrapNavbar.Text>
          </BootstrapNavbar.Collapse>
        </BootstrapContainer>
      </BootstrapNavbar>
      <BootstrapContainer className='dashboard-container'>
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
      </BootstrapContainer>
    </section>
  );
}

export default App;
