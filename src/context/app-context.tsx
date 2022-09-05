import React, { useContext, useState } from 'react';

interface IAppContext {
  currentUser: string;
  setCurrentUser?: (currentUser: string) => void;
  refreshDashboardTrigger: number;
  refreshDashboard?: () => void;
}

const defaultContext: IAppContext = {
  currentUser: '',
  refreshDashboardTrigger: 0,
};

const AppContext = React.createContext<IAppContext>(defaultContext);

interface IAppContextProviderProps {
  children?: JSX.Element | JSX.Element[];
}

export const AppContextProvider: React.FC<IAppContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<string>(
    defaultContext.currentUser
  );
  const [refreshDashboardTrigger, setRefreshDashboardTrigger] =
    useState<number>(defaultContext.refreshDashboardTrigger);

  const refreshDashboard: () => void = () => {
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
