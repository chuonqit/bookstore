import { BookService } from './../../../../shared/services/book.service';
import { IPublisher } from './../../../../shared/models/Publisher.model';
import { IAuthor } from './../../../../shared/models/Auhor.model';
import { PublisherService } from './../../../../shared/services/publisher.service';
import { AuthorService } from './../../../../shared/services/author.service';
import { ICategory } from './../../../../shared/models/Category.model';
import { CategoryService } from './../../../../shared/services/category.service';
import { environment } from './../../../../../environments/environment';
import { Observable, Observer } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
})
export class BookCreateComponent implements OnInit {
  bookForm: FormGroup;
  loading = false;
  avatarUrl?: string;
  categories: ICategory[];
  authors: IAuthor[];
  publishers: IPublisher[];
  urlUpload: string = environment.apiUrl + 'upload/cloudinary-single-upload';

  constructor(
    private router$: Router,
    private message: NzMessageService,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private bookService: BookService,
    private publisherService: PublisherService
  ) {
    this.bookForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      image: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      priceSale: new FormControl('', []),
      stock: new FormControl('', [Validators.required]),
      category: new FormControl([], [Validators.required]),
      description: new FormControl('', []),
      author: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      status: new FormControl(true, []),
      featured: new FormControl(false, []),
      pin: new FormControl(false, []),
    });

    this.categories = [];
    this.authors = [];
    this.publishers = [];
  }

  ngOnInit(): void {
    this.categoryService.list_active().subscribe((categories) => {
      this.categories = categories;
    });
    this.authorService.list_active().subscribe((authors) => {
      this.authors = authors;
    });
    this.publisherService.list_active().subscribe((publishers) => {
      this.publishers = publishers;
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.bookService.create(this.bookForm.value).subscribe(
        () => {
          this.router$.navigateByUrl('/manager/books');
          this.message.success('Thêm mới thành công');
        },
        (error) => {
          this.message.error(error.error);
        }
      );
    }
  }

  clearForm() {
    this.bookForm.reset();
    this.avatarUrl = '';
  }

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.message.error('Bạn chỉ có thể tải ảnh JPEG hoặc PNG!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.error('Kích thước ảnh tối đa là 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  handleChange(info: { file: NzUploadFile }) {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        this.avatarUrl = '';
        break;
      case 'done':
        this.getBase64(info.file!.originFileObj!, () => {
          this.loading = false;
          this.avatarUrl = info.file.response.secure_url;
          this.bookForm.patchValue({
            image: info.file.response.secure_url,
          });
        });
        break;
      case 'error':
        this.message.error('Network error');
        this.loading = false;
        break;
    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
}
