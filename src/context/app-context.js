import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [counter, setCounter] = useState(null);

  const refreshDashboard = () => {
    setCounter(counter + 1);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        counter,
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
