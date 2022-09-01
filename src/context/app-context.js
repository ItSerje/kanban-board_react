import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const refreshDashboard = (num) => {
    return num + 1;
  };

  //   useEffect(() => {}, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
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
