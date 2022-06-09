import { BookService } from './../../../shared/services/book.service';
import { IHomeData } from './../../../shared/models/Books.model';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  homeData: IHomeData | null;

  constructor(private title$: Title, private bookService: BookService) {
    this.homeData = null;
  }

  ngOnInit(): void {
    this.bookService.list_home().subscribe((response) => {
      this.homeData = response;
    });

    this.title$.setTitle('Bookstore, cửa hàng sách trực tuyến');
  }
}
