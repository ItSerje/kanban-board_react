import { useState } from 'react';
import './App.css';
import Modal from './components/modal/Modal';
import LoginForm from './components/loginForm/LoginForm';
import Navbar from './components/navbar/Navbar';
import DashboardContainer from './components/dashboard/DashboardContainer';

function App() {
  const [isModalShown, setIsModalShown] = useState(true);
  const openModal = () => setIsModalShown(true);
  const closeModal = () => setIsModalShown(false);

  return (
    <>
      {isModalShown && (
        <Modal>
          <LoginForm closeModal={closeModal} />
        </Modal>
      )}
      {!isModalShown && (
        <>
          <Navbar logout={openModal} />
          <main>
            <DashboardContainer />
          </main>
        </>
      )}
    </>
  );
}

export default App;
