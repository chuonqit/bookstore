import { CategoryService } from './../../../../shared/services/category.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private router$: Router,
    private message: NzMessageService,
    private categoryService: CategoryService
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      status: new FormControl(true, []),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.create(this.categoryForm.value).subscribe(
        () => {
          this.router$.navigateByUrl('/manager/categories');
          this.message.success('Thêm mới thành công');
        },
        (error) => {
          this.message.error(error.error);
        }
      );
    }
  }
}
