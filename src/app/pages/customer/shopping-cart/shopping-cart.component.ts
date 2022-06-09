import { delay } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IBook } from './../../../shared/models/Books.model';
import { AuthService } from './../../../shared/services/auth.service';
import { IUser, ICartUser } from './../../../shared/models/User.model';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  currentUser: IUser | null;
  cart!: ICartUser;

  constructor(
    private title$: Title,
    private authService: AuthService,
    private message: NzMessageService
  ) {
    this.currentUser = null;
  }

  increase(index: number) {
    const updateQuantity = this.cart.books.map((item, key) => {
      if (key === index) {
        item.quantity++;
        item.price =
          item.quantity *
          (item.book.priceSale > 0 ? item.book.priceSale : item.book.price);
      }
      return item;
    });
    this.cart = {
      ...this.cart,
      books: updateQuantity,
    };
    this.updateTotalCart();
  }

  changeQuantity(value: string, index: number) {
    const updateQuantity = this.cart.books.map((item, key) => {
      if (key === index) {
        item.quantity = parseInt(value);
        if (item.quantity < 0) {
          item.quantity = 0;
        }
        item.price =
          item.quantity *
          (item.book.priceSale > 0 ? item.book.priceSale : item.book.price);
      }
      return item;
    });
    this.cart = {
      ...this.cart,
      books: updateQuantity,
    };
    this.updateTotalCart();
  }

  decrease(index: number) {
    const updateQuantity = this.cart.books.map((item, key) => {
      if (key === index) {
        item.quantity--;
        if (item.quantity < 0) {
          item.quantity = 0;
        }
        item.price =
          item.quantity *
          (item.book.priceSale > 0 ? item.book.priceSale : item.book.price);
      }
      return item;
    });
    this.cart = {
      ...this.cart,
      books: updateQuantity,
    };
    this.updateTotalCart();
  }

  updateTotalCart() {
    const total = this.cart.books.reduce((total, current) => {
      return total + current.price;
    }, 0);

    this.cart = {
      ...this.cart,
      total,
    };

    this.authService
      .add_cart(this.cart)
      .pipe(delay(300))
      .subscribe((response) => {
        this.message.success('Cập nhật giỏ hàng thành công');
      });
  }

  removeItem(index: number) {
    const filtered = this.cart.books.filter((x, y) => y !== index);
    this.cart.books = filtered;
    this.updateTotalCart();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((response) => {
      this.currentUser = response;
    });
    this.authService.get_cart(this.currentUser?._id).subscribe((response) => {
      this.cart = response;
    });
    this.title$.setTitle('Giỏ hàng - Bookstore');
  }
}
