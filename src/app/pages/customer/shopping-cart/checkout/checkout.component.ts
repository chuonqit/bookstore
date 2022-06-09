import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICartUser, IUser } from './../../../../shared/models/User.model';
import { AuthService } from './../../../../shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  currentUser: IUser | null;
  cart!: ICartUser;

  orderForm: FormGroup;

  constructor(private title$: Title, private authService: AuthService) {
    this.currentUser = null;
    this.orderForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/\S+@\S+\.\S+/),
      ]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      note: new FormControl('', []),
    });
  }

  orderNow() {
    if (this.orderForm.valid) {
      console.log({
        orderBy: this.currentUser?._id,
        orderInfo: this.orderForm.value,
        books: this.cart?.books,
        total: this.cart.total,
      });
    }
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((response) => {
      this.currentUser = response;
    });
    this.authService.get_cart(this.currentUser?._id).subscribe((response) => {
      this.cart = response;
    });
    this.orderForm.patchValue({
      name: this.currentUser?.name,
      email: this.currentUser?.email,
      address: this.currentUser?.address,
    });
    this.title$.setTitle('Thanh toán - Bookstore');
  }
}
