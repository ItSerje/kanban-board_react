import React, { useContext, useEffect, useReducer } from 'react';
import { UPDATE_DASHBOARD_COLUMN_NAME } from '../actions';
import reducer from '../reducers/dashboard_reducer';
import dashboardState from '../dashboardState.json';

const DashboardContext = React.createContext();

const initialState =
  JSON.parse(window.localStorage.getItem('dashboard')) ||
  dashboardState.dashboard;

export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateDashboardColumnName = (columnId, text) => {
    dispatch({
      type: UPDATE_DASHBOARD_COLUMN_NAME,
      payload: { columnId, text },
    });
  };

  useEffect(() => {
    window.localStorage.setItem('dashboard', JSON.stringify(state));
  }, [state]);

  return (
    <DashboardContext.Provider
      value={{ dashboard: state, updateDashboardColumnName }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
