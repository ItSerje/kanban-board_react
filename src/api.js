// // fake server connection
import dashboardState from './dashboardState.json';
import generateId from './utils/generateId';

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

const createCard = async (title, columnId, currentUser) => {
  await asyncTimeout(RESPONSE_DELAY);
  const columns = await getColumnsFromLocalStorage();
  const newColumns = columns.map((column) => {
    if (column.id === columnId) {
      column.cards.push({
        id: generateId(20).toString(),
        author: currentUser,
        title: title,
        text: '',
        comments: [],
      });
      return column;
    }
    return column;
  });
  await replaceColumnsInLocalStorage(newColumns);
};

const updateCard = async (card) => {
  await asyncTimeout(RESPONSE_DELAY);
  const columns = await getColumnsFromLocalStorage();
  const newColumns = columns.map((column) => {
    const newCards = column.cards.map((oldCard) =>
      oldCard.id === card.id ? card : oldCard
    );
    column.cards = newCards;
    return column;
  });
  await replaceColumnsInLocalStorage(newColumns);
};

const deleteCard = async (id) => {
  await asyncTimeout(RESPONSE_DELAY);
  const columns = await getColumnsFromLocalStorage();
  const newColumns = columns.map((column) => {
    const newCards = column.cards.filter((oldCard) => oldCard.id !== id);
    column.cards = newCards;
    return column;
  });
  await replaceColumnsInLocalStorage(newColumns);
};

const updateColumnName = async (columnId, newName) => {
  await asyncTimeout(RESPONSE_DELAY);
  const columns = await getColumnsFromLocalStorage();
  const newColumns = columns.map((column) => {
    if (column.id === columnId) {
      column.name = newName;
    }
    return column;
  });
  await replaceColumnsInLocalStorage(newColumns);
};

const createComment = async (cardId, text, currentUser) => {
  const card = await fetchCardById(cardId);
  card.comments.push({
    id: generateId(20).toString(),
    author: currentUser,
    comment: text,
  });
  updateCard(card);
};

const updateComment = async (cardId, commentId, text) => {
  const card = await fetchCardById(cardId);
  const newComments = card.comments.map((comment) => {
    if (comment.id && comment.id === commentId) {
      comment.comment = text;
      return comment;
    }
    return comment;
  });
  const updatedCard = { ...card, comments: newComments };
  updateCard(updatedCard);
};

const deleteComment = async (cardId, commentId) => {
  const card = await fetchCardById(cardId);
  console.log(card);
  const newComments = card.comments.filter(
    (comment) => comment.id !== commentId
  );
  const updatedCard = { ...card, comments: newComments };
  updateCard(updatedCard);
};

export {
  fetchDashboard,
  fetchCardById,
  updateCard,
  deleteCard,
  updateColumnName,
  createCard,
  updateComment,
  deleteComment,
  createComment,
};

const getColumnsFromLocalStorage = async () => {
  const db = localStorage.getItem('db');
  const parsedDb = await JSON.parse(db);
  return parsedDb.dashboard.columns;
};
const replaceColumnsInLocalStorage = async (newColumns) => {
  const db = localStorage.getItem('db');
  const parsedDb = await JSON.parse(db);
  const updatedDashboard = { ...parsedDb.dashboard, columns: newColumns };
  const updatedDb = { ...parsedDb, dashboard: updatedDashboard };
  localStorage.setItem('db', JSON.stringify(updatedDb));
  return true;
};
