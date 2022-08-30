// // fake server connection
import dashboardState from './dashboardState.json';

const generateId = () => new Date().getTime();
const responseDelay = 1000;

const asyncTimeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const fetchDashboard = async () => {
  let dashboard = localStorage.getItem('dashboard');
  await asyncTimeout(responseDelay);
  if (dashboard) {
    dashboard = await JSON.parse(dashboard);
    return dashboard;
  }
  dashboard = dashboardState.dashboard;
  localStorage.setItem('dashboard', JSON.stringify(dashboard));
  return dashboard;
};

const signInUser = async (user) => {
  console.log('trying to signin...');
  localStorage.setItem('currenUser', JSON.stringify(user));
};

export { fetchDashboard, signInUser };
