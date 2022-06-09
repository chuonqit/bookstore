import { IBook } from './../../models/Books.model';
import { Component, Input, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Autoplay, Navigation } from 'swiper';

SwiperCore.use([Autoplay, Navigation]);

@Component({
  selector: 'app-home-best-seller',
  templateUrl: './home-best-seller.component.html',
  styleUrls: [
    './home-best-seller.component.scss',
    './home-best-seller-swipper.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeBestSellerComponent {
  @Input('data') bestSellers?: IBook[];

  constructor() {
    this.bestSellers = [];
  }
}
