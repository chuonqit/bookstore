import { ZorroModule } from './../zorro/zorro.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HomeBestSellerComponent } from './components/home-best-seller/home-best-seller.component';
import { SpecialOfferComponent } from './components/special-offer/special-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { BookListComponent } from './components/book-list/book-list.component';

@NgModule({
  declarations: [
    HomeBannerComponent,
    HomeBestSellerComponent,
    SpecialOfferComponent,
    CategoryFilterComponent,
    ValidatorComponent,
    BookListComponent,
  ],
  imports: [RouterModule, CommonModule, SwiperModule, ZorroModule],
  exports: [
    HomeBannerComponent,
    HomeBestSellerComponent,
    SpecialOfferComponent,
    FormsModule,
    CategoryFilterComponent,
    ValidatorComponent,
    ReactiveFormsModule,
    BookListComponent,
  ],
})
export class SharedModule {}
