import { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CardsList from './components/cardsList/CardsList';
import LoginModal from './components/LoginModal/LoginModal';
import testJson from './test.json';

function App() {
  const [modalShow, setModalShow] = useState(true);
  const closeModalHandler = () => setModalShow(false);
  const loginHandler = () => console.log('login');

  return (
    <section className='dashboard'>
      <LoginModal
        modalShow={modalShow}
        closeModalHandler={closeModalHandler}
        loginHandler={loginHandler}
      />
      <CardsList cards={testJson} />
      <CardsList cards={testJson} />
      <CardsList cards={testJson} />
      <CardsList cards={testJson} />
    </section>
  );
}

export default App;
