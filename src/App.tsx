import { SetStateAction, useState } from 'react';
import './App.css';
import LoginModal from './components/loginModal/LoginModal';
import Navbar from './components/navbar/Navbar';
import DashboardContainer from './components/dashboard/DashboardContainer';

function App() {
  const [modalShow, setModalShow] = useState(true);
  const closeModalHandler = () => setModalShow(false);
  const [currentUser, setCurrentUser] = useState('');
  const getCurrentUser = (user: SetStateAction<string>) => setCurrentUser(user);

  return (
    <>
      {modalShow && (
        <LoginModal
          modalShow={modalShow}
          closeModalHandler={closeModalHandler}
          getCurrentUser={getCurrentUser}
        />
      )}
      {!modalShow && (
        <>
          <Navbar currentUser={currentUser} />
          <main>
            <DashboardContainer currentUser={currentUser} />
          </main>
        </>
      )}
    </>
  );
}

export default App;
