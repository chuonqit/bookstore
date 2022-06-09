import { IBook } from './../../../shared/models/Books.model';
import { BookService } from './../../../shared/services/book.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  keyword: string;
  books: IBook[];

  constructor(
    private activatedRoute$: ActivatedRoute,
    private title$: Title,
    private bookService: BookService
  ) {
    this.keyword = '';
    this.books = [];
  }

  ngOnInit(): void {
    this.keyword = this.activatedRoute$.snapshot.queryParams['q'];

    this.bookService.search(this.keyword).subscribe((response) => {
      this.books = response;
    });

    this.title$.setTitle('Tìm kiếm: ' + this.keyword);
  }
}
