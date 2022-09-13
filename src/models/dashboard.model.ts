interface IColumn {
  id: string;
  name: string;
  cards: ICard[];
}

interface ICard {
  id: string;
  columnId: string;
  title: string;
  commentsNumber: number;
}

interface IFullCard {
  id: string;
  columnId: string;
  columnName: string;
  author: string;
  title: string;
  text: string;
  comments: IComment[];
}

interface IComment {
  id: string;
  cardId: string;
  author: string;
  comment: string;
}

export type { IColumn, ICard, IFullCard, IComment };
