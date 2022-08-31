// // fake server connection
import dashboardState from './dashboardState.json';

const generateId = () => new Date().getTime();
const RESPONSE_DELAY = 1000;

const asyncTimeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const exportJSONToLocalStorage = async () => {
  if (!localStorage.getItem('db')) {
    localStorage.setItem('db', JSON.stringify(dashboardState));
  }
};

const fetchDashboard = async () => {
  await exportJSONToLocalStorage();
  await asyncTimeout(RESPONSE_DELAY);
  const data = localStorage.getItem('db');
  if (data) {
    const parsedData = await JSON.parse(data);
    return parsedData.dashboard;
  }
  return null;
};

const signInUser = async (user) => {
  await asyncTimeout(RESPONSE_DELAY);
  localStorage.setItem('currenUser', JSON.stringify(user));
  return true;
};

const fetchCurrentUser = async () => {
  await asyncTimeout(RESPONSE_DELAY);
  const response = localStorage.getItem('currentUser');
  if (response) {
    return await JSON.parse(response);
  }
  return null;
};

export { fetchDashboard, signInUser, fetchCurrentUser };
