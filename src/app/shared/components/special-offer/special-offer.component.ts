import { ICartUser, IUser } from './../../models/User.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IBook } from './../../models/Books.model';
import { Component, Input, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Navigation } from 'swiper';
import { AuthService } from '../../services/auth.service';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-special-offer',
  templateUrl: './special-offer.component.html',
  styleUrls: [
    './special-offer.component.scss',
    './special-offer-swipper.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SpecialOfferComponent {
  @Input() navigation: boolean;
  @Input() mainTitle: string;
  @Input() cssMode: boolean;
  @Input('data') books?: IBook[];
  cart!: ICartUser;
  currentUser!: IUser | null;

  constructor(
    private authService: AuthService,
    private message: NzMessageService
  ) {
    this.navigation = true;
    this.cssMode = false;
    this.mainTitle = '';
  }

  addCart(book: IBook) {
    if (this.currentUser) {
      let booksCart: any[] = [];

      if (this.cart?.books) {
        booksCart = booksCart.concat(this.cart?.books);
      }

      const checkExist = booksCart.find((x) => x.book._id == book._id);

      if (checkExist) {
        booksCart = booksCart.map((x) => {
          if (x.book._id == book._id) {
            x.quantity++;
          }
          return x;
        });
      } else {
        booksCart.push({
          book: book,
          quantity: 1,
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

  getCartData() {
    this.authService.get_cart(this.currentUser?._id).subscribe((response) => {
      this.cart = response;
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((response) => {
      this.currentUser = response;
    });
    if (this.currentUser) {
      this.getCartData();
    }
  }
}
