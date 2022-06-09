import { BookService } from './../../../shared/services/book.service';
import { IBook } from './../../../shared/models/Books.model';
import { IPublisher } from './../../../shared/models/Publisher.model';
import { PublisherService } from './../../../shared/services/publisher.service';
import { AuthorService } from './../../../shared/services/author.service';
import { IAuthor } from './../../../shared/models/Auhor.model';
import { ICategory } from './../../../shared/models/Category.model';
import { CategoryService } from './../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  publishers: IPublisher[];
  authors: IAuthor[];
  allBooks: IBook[];
  books: IBook[];

  constructor(private title$: Title, private bookService: BookService) {
    this.publishers = [];
    this.authors = [];
    this.allBooks = [];
    this.books = [];
  }

  filterData(filter: { publisher: string; author: string }) {
    if (filter.author) {
      this.books = this.allBooks.filter(
        (book) => book.author._id === filter.author
      );
    } else if (filter.publisher) {
      this.books = this.allBooks.filter(
        (book) => book.publisher._id === filter.publisher
      );
    } else {
      this.books = this.allBooks;
    }
  }

  ngOnInit(): void {
    this.title$.setTitle('Thể loại');

    this.bookService.list().subscribe((books) => {
      this.allBooks = books;
      this.books = books;
    });
  }
}
