import { useState, useEffect } from 'react';
import { fetchDashboard } from '../../api';
import Dashboard from './Dashboard';
import './style.css';

const DashboardContainer = () => {
  const [counter, setCounter] = useState(0);
  const [dashboard, setDashboard] = useState();

  const refreshDashboard = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    const dashboard = fetchDashboard();
    setDashboard(dashboard);
  }, [counter]);

  return (
    <Dashboard refreshDashboard={refreshDashboard} dashboard={dashboard} />
  );
};

export default DashboardContainer;
