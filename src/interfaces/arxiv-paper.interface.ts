export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  published: Date;
  updated: Date;
  authors: string[];
  categories: string[];
  link: string;
}
