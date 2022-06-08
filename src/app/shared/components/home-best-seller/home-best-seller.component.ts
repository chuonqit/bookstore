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
  @Input('data') bestSellers: any[];

  constructor() {
    this.bestSellers = this.randomData();
  }

  randomData() {
    let data: any[] = [];
    for (let i = 1; i < Math.floor(Math.random() * 10) + 3; i++) {
      data.push({
        name: 'Name title ' + i,
        category: 'Category ' + i + ', Category ' + i + 1,
        image: 'https://picsum.photos/200/300?random=' + i,
        price: 50 * (i * i),
        newPrice: 50 * (i * i) - i * 10,
      });
    }
    return data;
  }
}
