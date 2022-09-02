import { useState, useEffect } from 'react';
import { fetchDashboard } from '../../api';
import Dashboard from './Dashboard';
// import FullCardContainer from '../cardForm/FullCardContainer';
import { useAppContext } from '../../context/app-context';
import './style.css';

const DashboardContainer = () => {
  let { counter: trigger } = useAppContext();
  const [dashboard, setDashboard] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const dashboard = await fetchDashboard();
      setDashboard(dashboard);
    };
    fetchData();
  }, [trigger]);

  return <Dashboard dashboard={dashboard} />;
};

export default DashboardContainer;
