export interface IDb {
  columns: {
    [key: string]: IDbColumn;
  };
  cards: {
    [key: string]: IDbCard;
  };
  comments: {
    [key: string]: IDbComment;
  };
}

interface IDbColumn {
  id: string;
  name: string;
}

interface IDbCard {
  id: string;
  columnId: string;
  author: string;
  title: string;
  text: string;
}

interface IDbComment {
  id: string;
  cardId: string;
  author: string;
  comment: string;
}
