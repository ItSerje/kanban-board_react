import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshDashboardTrigger, setRefreshDashboardTrigger] = useState(0);

  const refreshDashboard = () => {
    setRefreshDashboardTrigger(refreshDashboardTrigger + 1);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        refreshDashboardTrigger,
        refreshDashboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
