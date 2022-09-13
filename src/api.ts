// fake server connection
import dashboardState from './dashboardState.json';
import generateId from './utils/generateId';
import { IColumn, IFullCard } from './models/dashboard.model';
import { IDb } from './models/db.model';

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

const fetchDashboard = async (): Promise<IColumn[] | null> => {
  await exportJSONToLocalStorage();
  await asyncTimeout(RESPONSE_DELAY);
  const db: IDb | null = await getDbFromLocalStorage();
  if (!db) {
    return null;
  }

  // construct dashboard cards array
  const cards = Object.values(db.cards).map((card) => {
    const comments = Object.values(db.comments).filter(
      (comment) => comment.cardId === card.id
    ).length;
    return {
      id: card.id,
      columnId: card.columnId,
      title: card.title,
      commentsNumber: comments || 0,
    };
  });

  // construct columns array
  const columns = Object.values(db.columns).map((column) => {
    const columnCards =
      cards.filter((card) => card.columnId === column.id) || [];
    return { ...column, cards: columnCards };
  });

  return columns;
};

// HELPERS

// get db from localStorage
const getDbFromLocalStorage = async (): Promise<IDb | null> => {
  const data = localStorage.getItem('db');
  if (!data) {
    return null;
  }
  const db = await JSON.parse(data);
  if (!db) {
    return null;
  }
  return db;
};

// set db to localStorage
const setDbToLocalStorage = (db: IDb): void => {
  localStorage.setItem('db', JSON.stringify(db));
};

// CRUD FOR CARDS

// read
const fetchCardById = async (id: string): Promise<IFullCard | null> => {
  await asyncTimeout(RESPONSE_DELAY);
  const db: IDb | null = await getDbFromLocalStorage();
  if (!db) {
    return null;
  }
  const card = {
    ...db.cards[id],
    comments:
      Object.values(db.comments).filter((comment) => comment.cardId === id) ||
      [],
  };
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
  const db: IDb | null = await getDbFromLocalStorage();
  if (!db) {
    return false;
  }
  const newCard = {
    id: generateId(20).toString(),
    columnId: columnId,
    author: currentUser,
    title: title,
    text: '',
  };
  db.cards[newCard.id] = newCard;
  setDbToLocalStorage(db);
  return true;
};

// update
const updateCard = async (card: IFullCard): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  const db: IDb | null = await getDbFromLocalStorage();
  if (!db) {
    return false;
  }
  db.cards[card.id] = card;
  setDbToLocalStorage(db);
  return true;
};

// delete
const deleteCard = async (id: string): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  const db: IDb | null = await getDbFromLocalStorage();
  if (!db) {
    return false;
  }
  delete db.cards[id];

  // delete card's comments
  const filteredCommentsArray = Object.entries(db.comments).filter(
    ([key, value]) => value.cardId !== id
  );
  db.comments = Object.fromEntries(filteredCommentsArray);

  setDbToLocalStorage(db);
  return true;
};

// COMMENTS CRUD
// create
const createComment = async (
  cardId: string,
  text: string,
  currentUser: string
): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  const db: IDb | null = await getDbFromLocalStorage();
  if (!db) {
    return false;
  }
  const newComment = {
    id: generateId(20).toString(),
    cardId: cardId,
    author: currentUser,
    comment: text,
  };
  db.comments[newComment.id] = newComment;
  setDbToLocalStorage(db);
  return true;
};

// update
const updateComment = async (
  commentId: string,
  text: string
): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  const db: IDb | null = await getDbFromLocalStorage();
  if (!db) {
    return false;
  }
  db.comments[commentId].comment = text;
  setDbToLocalStorage(db);
  return true;
};

// delete
const deleteComment = async (commentId: string): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  const db: IDb | null = await getDbFromLocalStorage();
  if (!db) {
    return false;
  }
  delete db.comments[commentId];
  setDbToLocalStorage(db);
  return true;
};

// UPDATE COLUMN NAME
const updateColumnName = async (
  columnId: string,
  newName: string
): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  const db: IDb | null = await getDbFromLocalStorage();
  if (!db) {
    return false;
  }
  db.columns[columnId].name = newName;
  setDbToLocalStorage(db);
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
