import { useState } from 'react';
import './App.css';
import LoginModal from './components/loginModal/LoginModal';
import Navbar from './components/navbar/Navbar';
import DashboardContainer from './components/dashboard/DashboardContainer';

function App() {
  const [modalShow, setModalShow] = useState(true);
  const closeModalHandler = () => setModalShow(false);

  return (
    <>
      {modalShow && (
        <LoginModal
          modalShow={modalShow}
          closeModalHandler={closeModalHandler}
        />
      )}
      {!modalShow && (
        <>
          <Navbar />
          <DashboardContainer />
        </>
      )}
    </>
  );
}

export default App;
