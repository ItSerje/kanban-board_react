import React, { useState, useEffect } from 'react';
import { fetchDashboard } from '../../api';
import Dashboard from './Dashboard';
import { useAppContext } from '../../context/app-context';
import Spinner from 'react-bootstrap/Spinner';
import './style.css';
import { Icolumn } from '../../models/dashboard.model';

const DashboardContainer: React.FC = (): JSX.Element => {
  let { refreshDashboardTrigger } = useAppContext();
  const [columns, seColumns] = useState<Icolumn[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchSuccess, setIsFetchSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      const newDashboard = await fetchDashboard();
      if (newDashboard) {
        seColumns(newDashboard);
        setIsFetchSuccess(true);
      } else {
        setIsFetchSuccess(false);
      }
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
  if (isFetchSuccess && columns) {
    return <Dashboard columns={columns} />;
  }
  return <></>;
};

export default DashboardContainer;
