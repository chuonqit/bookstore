import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { IUser } from './../../../shared/models/User.model';
import { AuthService } from './../../../shared/services/auth.service';
import { ICategory } from './../../../shared/models/Category.model';
import { CategoryService } from './../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import SwiperCore from 'swiper';
import { NgForm } from '@angular/forms';

SwiperCore.use([]);

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
})
export class CustomerHeaderComponent implements OnInit {
  categories: ICategory[];
  currentUser: IUser | null;
  keyword: string;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private router$: Router,
    private message: NzMessageService
  ) {
    this.router$.routeReuseStrategy.shouldReuseRoute = () => false;
    this.categories = [];
    this.currentUser = null;
    this.keyword = '';
  }

  logout() {
    this.authService.logout();
    this.router$.navigate(['/login']);
    this.message.create('success', 'Đăng xuất thành công');
  }

  onSearch(form: NgForm) {
    this.router$.navigate(['/search'], {
      queryParams: {
        q: form.value.keyword,
      },
    });
  }

  ngOnInit(): void {
    this.categoryService.list_active().subscribe((response) => {
      this.categories = response;
    });
    this.authService.currentUser.subscribe((response) => {
      this.currentUser = response;
    });
  }
}
