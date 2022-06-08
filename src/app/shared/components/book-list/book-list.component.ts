import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  @Input('data') books: any[];
  @Input('col') col: number;

  constructor() {
    this.books = [];
    this.col = 4;
  }

  ngOnInit(): void {
    this.books = this.randomData();
  }

  randomData() {
    let data: any[] = [];
    for (let i = 1; i < Math.floor(Math.random() * 10) + 3; i++) {
      data.push({
        name: 'Name title ' + i,
        category: 'Category ' + i,
        image: 'https://picsum.photos/200/300?random=' + i,
        price: 50 * (i * i),
        newPrice: 50 * (i * i) - i * 10,
      });
    }
    return data;
  }
}
