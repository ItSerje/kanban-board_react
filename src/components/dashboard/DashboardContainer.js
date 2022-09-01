import { useState, useEffect } from 'react';
import { fetchDashboard } from '../../api';
import Dashboard from './Dashboard';
import CardFormContainer from '../cardForm/CardFormContainer';
import './style.css';

const DashboardContainer = (currentUser) => {
  const [counter, setCounter] = useState(0);
  const [dashboard, setDashboard] = useState();
  const [showCardForm, setShowCardForm] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [currentColumnId, setCurrentColumnId] = useState(null);

  const refreshDashboard = () => {
    setCounter(counter + 1);
  };

  const openCardHandler = (cardId, columnId) => {
    setCurrentCardId(cardId);
    setCurrentColumnId(columnId);
    setShowCardForm(true);
  };

  const closeCardFormHandler = () => {
    setShowCardForm(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dashboard = await fetchDashboard();
      setDashboard(dashboard);
    };
    fetchData();
  }, [counter]);

  return (
    <>
      {showCardForm && (
        <CardFormContainer
          dashboard={dashboard}
          currentUser={currentUser}
          currentCardId={currentCardId}
          currentColumnId={currentColumnId}
          refreshDashboard={refreshDashboard}
          showCardForm={showCardForm}
          closeCardFormHandler={closeCardFormHandler}
        />
      )}
      {!showCardForm && (
        <Dashboard
          dashboard={dashboard}
          refreshDashboard={refreshDashboard}
          openCardHandler={openCardHandler}
        />
      )}
    </>
  );
};

export default DashboardContainer;
