import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthor } from './../../../shared/models/Auhor.model';
import { AuthorService } from './../../../shared/services/author.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  authors: IAuthor[];
  isVisible = false;
  isOkLoading = false;
  authorForm: FormGroup;
  currentData: IAuthor | null;

  constructor(
    private nzMessageService: NzMessageService,
    private authorService: AuthorService
  ) {
    this.authors = [];
    this.currentData = null;
    this.authorForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      status: new FormControl(false, []),
    });
  }

  showModal(data: IAuthor | null): void {
    this.isVisible = true;
    if (data) {
      this.currentData = data;
      this.authorForm.patchValue(data);
    }
  }

  handleOk(): void {
    this.onSubmit();
  }

  onSubmit() {
    this.isOkLoading = true;
    if (this.currentData) {
      this.authorService
        .update({ _id: this.currentData._id, ...this.authorForm.value })
        .subscribe(
          (response) => {
            this.isVisible = false;
            this.isOkLoading = false;
            const updateData = this.authors.map((author) =>
              author._id === this.currentData?._id ? response : author
            );
            this.authors = [...updateData];
            this.nzMessageService.success('Cập nhật thành công');
          },
          (error) => {
            this.nzMessageService.error(error.error);
          }
        );
    } else {
      this.authorService.create(this.authorForm.value).subscribe(
        (response) => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.authors = [response, ...this.authors];
          this.nzMessageService.success('Thêm thành công');
        },
        (error) => {
          this.nzMessageService.error(error.error);
        }
      );
    }
    this.authorForm.reset();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.authorForm.reset();
  }

  confirm(id: string): void {
    this.authorService.delete(id).subscribe(
      () => {
        const filtered = this.authors.filter((author) => author._id !== id);
        this.authors = [...filtered];
        this.nzMessageService.success('Xóa thành công');
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }

  changeStatus(id: string, status: boolean): void {
    this.authorService.update_status(id, status).subscribe(
      (response) => {
        const updateData = this.authors.map((author) =>
          author._id === id ? response : author
        );
        this.authors = [...updateData];
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
    this.authorService.list().subscribe(
      (authors) => {
        this.authors = authors;
      },
      (error) => {
        this.nzMessageService.error(error.error);
      }
    );
  }
}
