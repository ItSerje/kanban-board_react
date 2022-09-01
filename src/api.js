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

const fetchCardById = async (id) => {
  await asyncTimeout(RESPONSE_DELAY);
  const data = localStorage.getItem('db');
  if (data) {
    const parsedData = await JSON.parse(data);
    const cards = parsedData.dashboard.columns
      .map((column) => column.cards) // add find here, then get value from the array which includes undefined values
      .flat();
    const card = cards.find((card) => card.id === id);
    return card;
  }
  return null;
};

export { fetchDashboard, fetchCardById };
