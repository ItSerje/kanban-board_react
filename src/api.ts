// fake server connection
import dashboardState from './dashboardState.json';
import generateId from './utils/generateId';
import { Idashboard, Icolumn, Icard, Icomment } from './models/dashboard.model';

// change to control 'request' duration - affects spinner on dashboard and full card
const RESPONSE_DELAY = 500;

const asyncTimeout = (ms: number): Promise<number> => {
  return new Promise<number>((resolve) => {
    setTimeout(resolve, ms);
  });
};

const exportJSONToLocalStorage = async (): Promise<void> => {
  if (!localStorage.getItem('db')) {
    localStorage.setItem('db', JSON.stringify(dashboardState));
  }
};

const fetchDashboard = async (): Promise<Icolumn[] | null> => {
  await exportJSONToLocalStorage();
  await asyncTimeout(RESPONSE_DELAY);
  const db = localStorage.getItem('db');
  if (!db) {
    return null;
  }
  const parsedData = await JSON.parse(db);
  const dashboard: Idashboard = parsedData;
  if (!dashboard) {
    return null;
  }
  return dashboard.dashboard.columns;
};

// HELPERS
// helper function for all the following requests
const getColumnsFromLocalStorage = async (): Promise<Icolumn[] | null> => {
  const db = localStorage.getItem('db');
  if (!db) {
    return null;
  }
  const parsedDb = await JSON.parse(db);
  const dashboard = parsedDb.dashboard;
  const columns: Icolumn[] = dashboard.columns;
  if (!columns) {
    return null;
  }
  return columns;
};

// helper function for all the following requests
const replaceColumnsInLocalStorage = async (
  newColumns: Icolumn[]
): Promise<boolean> => {
  const db = localStorage.getItem('db');
  if (!db) {
    return false;
  }
  const parsedDb = await JSON.parse(db);
  const updatedDashboard = { ...parsedDb.dashboard, columns: newColumns };
  const updatedDb: Idashboard = { ...parsedDb, dashboard: updatedDashboard };
  if (!updatedDb) {
    return false;
  }
  localStorage.setItem('db', JSON.stringify(updatedDb));
  return true;
};

// CRUD FOR CARDS
// read
const fetchCardById = async (id: string): Promise<Icard | null> => {
  await asyncTimeout(RESPONSE_DELAY);
  const columns = await getColumnsFromLocalStorage();
  if (!columns || columns.length === 0) {
    return null;
  }
  const cards = columns
    .map((column: Icolumn) => {
      const cards: Icard[] = column.cards;
      return cards;
    })
    .flat();
  const card = cards.find((card: Icard) => card?.id === id);
  if (!card) {
    return null;
  }
  return card;
};

// create
const createCard = async (
  title: string,
  columnId: string,
  currentUser: string
): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  const columns = await getColumnsFromLocalStorage();
  if (!columns || columns.length === 0) {
    return false;
  }
  const newColumns: Icolumn[] = columns.map((column: Icolumn) => {
    if (column.id === columnId) {
      column.cards.push({
        id: generateId(20).toString(),
        author: currentUser,
        title: title,
        text: '',
        comments: [],
      });
    }
    return column;
  });
  await replaceColumnsInLocalStorage(newColumns);
  return true;
};

// update
const updateCard = async (card: Icard): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  const columns = await getColumnsFromLocalStorage();
  if (!columns || columns.length === 0) {
    return false;
  }
  const newColumns: Icolumn[] = columns.map((column: Icolumn) => {
    const newCards: Icard[] = column.cards.map((oldCard: Icard) =>
      oldCard.id === card.id ? card : oldCard
    );
    column.cards = newCards;
    return column;
  });
  await replaceColumnsInLocalStorage(newColumns);
  return true;
};

// delete
const deleteCard = async (id: string): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  const columns = await getColumnsFromLocalStorage();
  if (!columns || columns.length === 0) {
    return false;
  }
  const newColumns: Icolumn[] = columns.map((column: Icolumn) => {
    const newCards: Icard[] = column.cards.filter(
      (oldCard: Icard) => oldCard.id !== id
    );
    column.cards = newCards;
    return column;
  });
  await replaceColumnsInLocalStorage(newColumns);
  return true;
};

// COMMENTS CRUD
// create
const createComment = async (
  cardId: string,
  text: string,
  currentUser: string
): Promise<boolean> => {
  const card: Icard | null = await fetchCardById(cardId);
  if (!card || !card.comments) {
    return false;
  }
  card.comments.push({
    id: generateId(20).toString(),
    author: currentUser,
    comment: text,
  });
  await updateCard(card);
  return true;
};

// update
const updateComment = async (
  cardId: string,
  commentId: string,
  text: string
): Promise<boolean> => {
  const card: Icard | null = await fetchCardById(cardId);
  if (!card || !card.comments) {
    return false;
  }
  const newComments: Icomment[] = card.comments.map((comment: Icomment) => {
    if (comment.id && comment.id === commentId) {
      comment.comment = text;
      return comment;
    }
    return comment;
  });
  const updatedCard: Icard = { ...card, comments: newComments };
  await updateCard(updatedCard);
  return true;
};

// delete
const deleteComment = async (
  cardId: string,
  commentId: string
): Promise<boolean> => {
  const card: Icard | null = await fetchCardById(cardId);
  if (!card || !card.comments) {
    return false;
  }
  const newComments: Icomment[] = card.comments.filter(
    (comment: Icomment) => comment.id !== commentId
  );
  const updatedCard: Icard = { ...card, comments: newComments };
  await updateCard(updatedCard);
  return true;
};

// UPDATE COLUMN NAME
const updateColumnName = async (
  columnId: string,
  newName: string
): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  const columns: Icolumn[] | null = await getColumnsFromLocalStorage();
  if (!columns || columns.length === 0) {
    return false;
  }
  const newColumns: Icolumn[] = columns.map((column: Icolumn) => {
    if (column.id === columnId) {
      column.name = newName;
    }
    return column;
  });
  await replaceColumnsInLocalStorage(newColumns);
  return true;
};

export {
  fetchDashboard,
  fetchCardById,
  createCard,
  updateCard,
  deleteCard,
  createComment,
  updateComment,
  deleteComment,
  updateColumnName,
};
