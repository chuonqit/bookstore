import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerLayoutComponent } from './manager-layout/manager-layout.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerHeaderComponent } from './customer-layout/customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer-layout/customer-footer/customer-footer.component';
import { ManagerToolbarComponent } from './manager-layout/manager-toolbar/manager-toolbar.component';
import { ManagerSidenavComponent } from './manager-layout/manager-sidenav/manager-sidenav.component';
import { ZorroModule } from '../zorro/zorro.module';
import { SharedModule } from '../shared/shared.module';
import { ActionsComponent } from './customer-layout/customer-header/actions/actions.component';
import { CategoriesComponent } from './customer-layout/customer-header/categories/categories.component';

@NgModule({
  declarations: [
    ManagerLayoutComponent,
    CustomerLayoutComponent,
    CustomerHeaderComponent,
    CustomerFooterComponent,
    ManagerToolbarComponent,
    ManagerSidenavComponent,
    ActionsComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ZorroModule,
    SwiperModule,
    SharedModule,
  ],
})
export class LayoutModule {}
