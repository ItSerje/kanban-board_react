import React, { useContext, useEffect, useState } from 'react';
import dashboardState from '../dashboardState.json';

const DashboardContext = React.createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState(
    JSON.parse(window.localStorage.getItem('dashboard')) ||
      dashboardState.dashboard
  );

  useEffect(() => {
    console.log('im hree');
    window.localStorage.setItem('dashboard', JSON.stringify(dashboard));
  }, [dashboard]);

  return (
    <DashboardContext.Provider value={{ dashboard, setDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
