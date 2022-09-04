import { useState, useEffect } from 'react';
import { fetchDashboard } from '../../api';
import Dashboard from './Dashboard';
import { useAppContext } from '../../context/app-context';
import Spinner from 'react-bootstrap/Spinner';
import './style.css';

const DashboardContainer = () => {
  let { refreshDashboardTrigger } = useAppContext();
  const [dashboard, setDashboard] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const dashboard = await fetchDashboard();
      setDashboard(dashboard);
      setIsLoading(false);
    };

    fetchData();
  }, [refreshDashboardTrigger]);

  if (isLoading) {
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='primary' className='spinner' />
      </div>
    );
  }

  return <Dashboard dashboard={dashboard} />;
};

export default DashboardContainer;
