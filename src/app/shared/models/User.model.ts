import { IBook } from './Books.model';
export interface IUser {
  _id: string;
  name: string;
  email: string;
  address: string;
  status: boolean;
  isAdmin: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ICartUser {
  user?: string;
  books: {
    book: IBook;
    quantity: number;
    price: number;
  }[];
  total: number;
}
