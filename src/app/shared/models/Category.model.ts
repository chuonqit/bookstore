import { IBook } from './Books.model';
export interface ICategory {
  _id: string;
  name: string;
  nameAscii: string;
  status: boolean;
}

export interface IBookCategory {
  category: ICategory;
  books: IBook[];
}
