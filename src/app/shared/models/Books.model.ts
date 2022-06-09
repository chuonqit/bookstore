import { IPublisher } from './Publisher.model';
import { IAuthor } from './Auhor.model';
import { ICategory } from './Category.model';
export interface IBook {
  _id: string;
  name: string;
  nameAscii: string;
  image: string;
  price: number;
  priceSale: number;
  stock: number;
  category: ICategory[];
  description: string;
  author: IAuthor;
  publisher: IPublisher;
  year: number;
  status: boolean;
  featured: boolean;
  pin: boolean;
}

export interface IHomeData {
  booksPin: IBook[];
  booksNew: IBook[];
  booksFeatured: IBook[];
  books: IBook[];
}
