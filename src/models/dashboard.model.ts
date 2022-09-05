interface Idashboard {
  dashboard: {
    columns: Icolumn[];
  };
}

interface Icolumn {
  id: string;
  name: string;
  cards: Icard[];
}

interface Icard {
  id: string;
  author: string;
  title: string;
  text: string;
  comments: Icomment[];
}

interface Icomment {
  id: string;
  author: string;
  comment: string;
}

export type { Idashboard, Icolumn, Icard, Icomment };
