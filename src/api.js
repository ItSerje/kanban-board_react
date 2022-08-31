// // fake server connection
import dashboardState from './dashboardState.json';

const generateId = () => new Date().getTime();
const responseDelay = 1000;

const asyncTimeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const exportJSONToLocalStorage = async () => {
  if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify(dashboardState));
  }
};

const fetchDashboard = async () => {
  await exportJSONToLocalStorage();
  await asyncTimeout(responseDelay);
  const data = localStorage.getItem('data');
  if (data) {
    const parsedData = await JSON.parse(data);
    return parsedData.dashboard;
  }
  return null;
};

const signInUser = async (user) => {
  await asyncTimeout(responseDelay);
  localStorage.setItem('currenUser', JSON.stringify(user));
  return true;
};

const fetchCurrentUser = async () => {
  await asyncTimeout(responseDelay);
  const response = localStorage.getItem('currentUser');
  if (response) {
    return await JSON.parse(response);
  }
  return null;
};

export { fetchDashboard, signInUser, fetchCurrentUser };
