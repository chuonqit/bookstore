import { IBook } from './../../../../shared/models/Books.model';
import { CategoryService } from './../../../../shared/services/category.service';
import { ICategory } from './../../../../shared/models/Category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit {
  nameAscii: string;
  books: IBook[];
  allBooks: IBook[];
  category: ICategory | null;

  constructor(
    private title$: Title,
    private router$: Router,
    private activatedRoute$: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.nameAscii = '';
    this.category = null;
    this.books = [];
    this.allBooks = [];
    this.router$.routeReuseStrategy.shouldReuseRoute = () => false;
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
    this.nameAscii = this.activatedRoute$.snapshot.params['nameAscii'];

    if (this.nameAscii) {
      this.categoryService
        .books_by_ascii(this.nameAscii)
        .subscribe((response) => {
          this.category = response.category;
          this.allBooks = response.books;
          this.books = response.books;
          this.title$.setTitle('Thể loại: ' + response.category.name);
          if (!response.category.status) {
            this.router$.navigateByUrl('/categories');
          }
        });
    }
  }
}
