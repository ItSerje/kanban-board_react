import { useState } from 'react';
import './App.css';
import LoginModal from './components/LoginModal/LoginModal';
import Navbar from './components/navbar/Navbar';
import DashboardContainer from './dashboard/DashboardContainer';

function App() {
  const [modalShow, setModalShow] = useState(true);
  const closeModalHandler = () => setModalShow(false);
  const loginHandler = () => console.log('login');

  return (
    <>
      <Navbar />
      <DashboardContainer />
      <LoginModal
        modalShow={modalShow}
        closeModalHandler={closeModalHandler}
        loginHandler={loginHandler}
      />
    </>
  );
}

export default App;
