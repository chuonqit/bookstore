import { CategoryService } from './../../../../shared/services/category.service';
import { ICategory } from './../../../../shared/models/Category.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: ICategory[];
  constructor(
    private nzMessageService: NzMessageService,
    private categoryService: CategoryService
  ) {
    this.categories = [];
  }

  confirm(id: string): void {
    this.categoryService.delete(id).subscribe(
      () => {
        const filtered = this.categories.filter(
          (category) => category._id !== id
        );
        this.categories = [...filtered];
        this.nzMessageService.success('Xóa thành công');
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }

  changeStatus(id: string, status: boolean): void {
    this.categoryService.update_status(id, status).subscribe(
      (response) => {
        const updateData = this.categories.map((category) =>
          category._id === id ? response : category
        );
        this.categories = [...updateData];
        this.nzMessageService.success('Thay đổi trạng thái thành công');
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.categoryService.list().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }
}
