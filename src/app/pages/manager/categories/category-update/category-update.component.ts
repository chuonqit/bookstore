import { CategoryService } from './../../../../shared/services/category.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss'],
})
export class CategoryUpdateComponent implements OnInit {
  id: string;
  categoryForm: FormGroup;

  constructor(
    private router$: Router,
    private message: NzMessageService,
    private activatedRoute$: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.id = '';
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      status: new FormControl(false, []),
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute$.snapshot.params['id'];
    this.categoryService.select_id(this.id).subscribe(
      (response) => {
        this.categoryForm.patchValue(response);
      },
      (error) => {
        this.message.error(error.error);
      }
    );
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService
        .update({
          _id: this.id,
          ...this.categoryForm.value,
        })
        .subscribe(
          () => {
            this.router$.navigateByUrl('/manager/categories');
            this.message.success('Cập nhật thành công');
          },
          (error) => {
            this.message.error(error.error);
          }
        );
    }
  }
}
