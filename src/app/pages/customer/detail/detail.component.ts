import { NzMessageService } from 'ng-zorro-antd/message';
import { ICartUser, IUser } from './../../../shared/models/User.model';
import { AuthService } from './../../../shared/services/auth.service';
import { BookService } from './../../../shared/services/book.service';
import { IBook } from './../../../shared/models/Books.model';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  nameAscii: string;
  quantity: number;
  book!: IBook;
  cart!: ICartUser;
  currentUser!: IUser | null;

  constructor(
    private activatedRoute$: ActivatedRoute,
    private title$: Title,
    private bookService: BookService,
    private authService: AuthService,
    private message: NzMessageService
  ) {
    this.nameAscii = '';
    this.quantity = 1;
  }

  ngOnInit(): void {
    this.nameAscii = this.activatedRoute$.snapshot.params['nameAscii'];
    if (this.nameAscii) {
      this.bookService.select_ascii(this.nameAscii).subscribe((response) => {
        this.book = response;
        this.title$.setTitle(response.name);
      });
    }

    this.authService.currentUser.subscribe((response) => {
      this.currentUser = response;
    });

    if (this.currentUser) {
      this.getCartData();
    }
  }

  getCartData() {
    this.authService.get_cart(this.currentUser?._id).subscribe((response) => {
      this.cart = response;
    });
  }

  addToCart(quantity: number) {
    if (this.currentUser) {
      let booksCart: any[] = [];

      if (this.cart?.books) {
        booksCart = booksCart.concat(this.cart?.books);
      }

      const checkExist = booksCart.find((x) => x.book._id == this.book._id);

      if (checkExist) {
        booksCart = booksCart.map((x) => {
          if (x.book._id == this.book._id) {
            x.quantity = x.quantity + quantity;
          }
          return x;
        });
      } else {
        booksCart.push({
          book: this.book,
          quantity: quantity,
        });
      }

      const total = booksCart.reduce((total: any, current: any) => {
        return total + current.price;
      }, 0);

      this.authService
        .add_cart({
          user: this.currentUser?._id,
          books: booksCart,
          total: total,
        })
        .subscribe((response) => {
          this.getCartData();
          this.message.success('Thêm vào giỏ hàng thành công');
        });
    } else {
      this.message.error('Vui lòng đăng nhập');
    }
  }
}
