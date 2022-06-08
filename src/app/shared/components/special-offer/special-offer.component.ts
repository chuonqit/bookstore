import { Component, Input, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Navigation } from 'swiper';

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

  constructor() {
    this.navigation = true;
    this.cssMode = false;
    this.mainTitle = '';
  }
}
