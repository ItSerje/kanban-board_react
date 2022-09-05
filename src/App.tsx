import React, { useState } from 'react';
import './App.css';
import Modal from './components/modal/Modal';
import LoginForm from './components/loginForm/LoginForm';
import Navbar from './components/navbar/Navbar';
import DashboardContainer from './components/dashboard/DashboardContainer';

const App: React.FC = (): JSX.Element => {
  const [isModalShown, setIsModalShown] = useState<boolean>(true);
  const openModal: () => void = () => setIsModalShown(true);
  const closeModal: () => void = () => setIsModalShown(false);

  return (
    <>
      {isModalShown && (
        <Modal isModalShown={isModalShown}>
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
};

export default App;
