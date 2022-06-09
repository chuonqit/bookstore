import { IBook } from './../../../../shared/models/Books.model';
import { BookService } from './../../../../shared/services/book.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: IBook[];
  constructor(
    private nzMessageService: NzMessageService,
    private bookService: BookService
  ) {
    this.books = [];
  }

  confirm(id: string): void {
    this.bookService.delete(id).subscribe(
      () => {
        const filtered = this.books.filter((book) => book._id !== id);
        this.books = [...filtered];
        this.nzMessageService.success('Xóa thành công');
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }

  changeStatus(id: string, status: boolean): void {
    this.bookService.update_status(id, status).subscribe(
      () => {
        this.nzMessageService.success('Thay đổi trạng thái thành công');
        this.getList();
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }

  changeFeatured(id: string, featured: boolean): void {
    this.bookService.update_featured(id, featured).subscribe(
      () => {
        this.nzMessageService.success('Thay đổi nổi bật thành công');
        this.getList();
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }

  changePin(id: string, pin: boolean): void {
    this.bookService.update_pin(id, pin).subscribe(
      () => {
        this.nzMessageService.success('Thay đổi ghim thành công');
        this.getList();
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.bookService.list().subscribe(
      (books) => {
        this.books = books;
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }
}
