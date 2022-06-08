import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detail-button',
  templateUrl: './detail-button.component.html',
  styleUrls: ['./detail-button.component.scss'],
})
export class DetailButtonComponent {
  @Input('quantity') quantity: number = 1;
  @Output('add-cart') addCart: EventEmitter<number> = new EventEmitter();

  constructor() {}

  quantityIncrease() {
    this.quantity++;
  }
  quantityDecrease() {
    this.quantity--;
  }
  addToCart() {
    this.addCart.emit(this.quantity);
  }
}
