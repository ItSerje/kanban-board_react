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

const updateCard = async (card) => {
  await asyncTimeout(RESPONSE_DELAY);
  const db = localStorage.getItem('db');
  const parsedDb = await JSON.parse(db);

  const newColumns = parsedDb.dashboard.columns.map((column) => {
    const newCards = column.cards.map((oldCard) =>
      oldCard.id === card.id ? card : oldCard
    );
    console.log(newCards);
    column.cards = newCards;
    return column;
  });
  const updatedDashboard = { ...parsedDb.dashboard, columns: newColumns };
  const updatedDb = { ...parsedDb, dashboard: updatedDashboard };

  localStorage.setItem('db', JSON.stringify(updatedDb));
  return null; // mb true?
};

const deleteCard = async (id) => {
  await asyncTimeout(RESPONSE_DELAY);
  const db = localStorage.getItem('db');
  const parsedDb = await JSON.parse(db);

  const newColumns = parsedDb.dashboard.columns.map((column) => {
    const newCards = column.cards.filter((oldCard) => oldCard.id !== id);
    column.cards = newCards;
    return column;
  });
  const updatedDashboard = { ...parsedDb.dashboard, columns: newColumns };
  const updatedDb = { ...parsedDb, dashboard: updatedDashboard };

  console.log(updatedDb);

  localStorage.setItem('db', JSON.stringify(updatedDb));
  return true;
};

const updateColumnName = async (columnId, newName) => {
  console.log('updateColumnName');
};

export {
  fetchDashboard,
  fetchCardById,
  updateCard,
  deleteCard,
  updateColumnName,
};

// заготовка для рефакторинга
const updateLocalStorage = async (action = null, card = null, id = null) => {
  const db = localStorage.getItem('db');
  const parsedDb = await JSON.parse(db);

  const newColumns = parsedDb.dashboard.columns.map((column) => {
    if (action === 'updateCard') {
      const newCards = column.cards.map((oldCard) =>
        oldCard.id === card.id ? card : oldCard
      );
      column.cards = newCards;
      return column;
    }

    if (action === 'deleteCard') {
      const newCards = column.cards.filter((oldCard) => oldCard.id !== id);
      column.cards = newCards;
      return column;
    }
    return column;
  });
  const updatedDashboard = { ...parsedDb.dashboard, columns: newColumns };
  const updatedDb = { ...parsedDb, dashboard: updatedDashboard };

  localStorage.setItem('db', JSON.stringify(updatedDb));
  return null; // mb true?
};
