import { Component, Input, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Autoplay, Pagination } from 'swiper';

SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeBannerComponent {
  pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };

  @Input('data') banners: string[];

  constructor() {
    this.banners = this.randomData();
  }

  randomData() {
    let data: any[] = [];
    for (let i = 1; i < Math.floor(Math.random() * 10) + 3; i++) {
      data.push('https://picsum.photos/800/500?random=' + i);
    }
    return data;
  }
}
