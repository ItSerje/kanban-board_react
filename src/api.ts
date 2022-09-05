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
  try {
    const data = localStorage.getItem('db');
    if (!data) {
      throw new Error();
    }
    const parsedData = await JSON.parse(data);
    const ds: Idashboard = parsedData;
    if (!ds) {
      throw new Error();
    }
    return ds.dashboard.columns;
  } catch (error) {
    return null;
  }
};

// HELPERS
// helper function for all the following requests
const getColumnsFromLocalStorage = async (): Promise<Icolumn[] | null> => {
  const db = localStorage.getItem('db');
  try {
    if (!db) {
      throw new Error();
    }
    const parsedDb = await JSON.parse(db);
    const dashboard = parsedDb.dashboard;
    const columns: Icolumn[] = dashboard.columns;
    if (!columns) {
      throw new Error();
    }
    return columns;
  } catch (error) {
    return null;
  }
};

// helper function for all the following requests
const replaceColumnsInLocalStorage = async (
  newColumns: Icolumn[]
): Promise<boolean> => {
  try {
    const db = localStorage.getItem('db');
    if (!db) {
      throw new Error();
    }
    const parsedDb = await JSON.parse(db);
    const updatedDashboard = { ...parsedDb.dashboard, columns: newColumns };
    const updatedDb: Idashboard = { ...parsedDb, dashboard: updatedDashboard };
    if (!updatedDb) {
      throw new Error();
    }
    localStorage.setItem('db', JSON.stringify(updatedDb));
    return true;
  } catch (error) {
    return false;
  }
};

// CRUD FOR CARDS
// read
const fetchCardById = async (id: string): Promise<Icard | null> => {
  await asyncTimeout(RESPONSE_DELAY);
  try {
    const columns: Icolumn[] | null = await getColumnsFromLocalStorage();
    if (!columns) {
      throw new Error();
    }
    const cards = columns
      .map((column: Icolumn) => {
        const cards: Icard[] = column.cards;
        return cards;
      })
      .flat();
    if (!cards) {
      throw new Error();
    }
    const card = cards.find((card: Icard) => card?.id === id);
    if (!card) {
      throw new Error();
    }
    return card;
  } catch (e) {
    return null;
  }
};

// create
const createCard = async (
  title: string,
  columnId: string,
  currentUser: string
): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  try {
    const columns = await getColumnsFromLocalStorage();
    if (!columns) {
      throw new Error();
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
    if (!newColumns) {
      throw new Error();
    }
    const res = await replaceColumnsInLocalStorage(newColumns);
    if (!res) {
      throw new Error();
    }
    return true;
  } catch (e) {
    return false;
  }
};

// update
const updateCard = async (card: Icard): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  try {
    const columns = await getColumnsFromLocalStorage();
    if (!columns) {
      throw new Error();
    }
    const newColumns: Icolumn[] = columns.map((column: Icolumn) => {
      const newCards: Icard[] = column.cards.map((oldCard: Icard) =>
        oldCard.id === card.id ? card : oldCard
      );
      column.cards = newCards;
      return column;
    });
    if (!newColumns) {
      throw new Error();
    }
    const res = await replaceColumnsInLocalStorage(newColumns);
    if (!res) {
      throw new Error();
    }
    return true;
  } catch (error) {
    return false;
  }
};

// delete
const deleteCard = async (id: string): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  try {
    const columns = await getColumnsFromLocalStorage();
    if (!columns) {
      throw new Error();
    }
    const newColumns: Icolumn[] = columns.map((column: Icolumn) => {
      const newCards: Icard[] = column.cards.filter(
        (oldCard: Icard) => oldCard.id !== id
      );
      column.cards = newCards;
      return column;
    });
    if (!newColumns) {
      throw new Error();
    }
    const res = await replaceColumnsInLocalStorage(newColumns);
    if (!res) {
      throw new Error();
    }
    return true;
  } catch (error) {
    return false;
  }
};

// COMMENTS CRUD
// create
const createComment = async (
  cardId: string,
  text: string,
  currentUser: string
): Promise<boolean> => {
  try {
    const card: Icard | null = await fetchCardById(cardId);
    if (!card) {
      throw new Error();
    }
    card.comments.push({
      id: generateId(20).toString(),
      author: currentUser,
      comment: text,
    });
    const res = await updateCard(card);
    if (!res) {
      throw new Error();
    }
    return true;
  } catch (error) {
    return false;
  }
};

// update
const updateComment = async (
  cardId: string,
  commentId: string,
  text: string
): Promise<boolean> => {
  try {
    const card: Icard | null = await fetchCardById(cardId);
    if (!card) {
      throw new Error();
    }
    const newComments: Icomment[] = card.comments.map((comment: Icomment) => {
      if (comment.id && comment.id === commentId) {
        comment.comment = text;
        return comment;
      }
      return comment;
    });
    if (!newComments) {
      throw new Error();
    }
    const updatedCard: Icard = { ...card, comments: newComments };
    if (!updatedCard) {
      throw new Error();
    }
    const res = await updateCard(updatedCard);
    if (!res) {
      throw new Error();
    }
    return true;
  } catch (error) {
    return false;
  }
};

// delete
const deleteComment = async (
  cardId: string,
  commentId: string
): Promise<boolean> => {
  try {
    const card: Icard | null = await fetchCardById(cardId);
    if (!card) {
      throw new Error();
    }
    const newComments: Icomment[] = card.comments.filter(
      (comment: Icomment) => comment.id !== commentId
    );
    if (!newComments) {
      throw new Error();
    }
    const updatedCard: Icard = { ...card, comments: newComments };
    if (!updatedCard) {
      throw new Error();
    }
    const res = updateCard(updatedCard);
    if (!res) {
      throw new Error();
    }
    return true;
  } catch (error) {
    return false;
  }
};

// UPDATE COLUMN NAME
const updateColumnName = async (
  columnId: string,
  newName: string
): Promise<boolean> => {
  await asyncTimeout(RESPONSE_DELAY);
  try {
    const columns: Icolumn[] | null = await getColumnsFromLocalStorage();
    if (!columns) {
      throw new Error();
    }
    const newColumns: Icolumn[] = columns.map((column: Icolumn) => {
      if (column.id === columnId) {
        column.name = newName;
      }
      return column;
    });
    if (!newColumns) {
      throw new Error();
    }
    const res = await replaceColumnsInLocalStorage(newColumns);
    if (!res) {
      throw new Error();
    }
    return true;
  } catch (error) {
    return false;
  }
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
