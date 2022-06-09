import { IPublisher } from './../../../../shared/models/Publisher.model';
import { IAuthor } from './../../../../shared/models/Auhor.model';
import { ICategory } from './../../../../shared/models/Category.model';
import { Observable, Observer } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { PublisherService } from './../../../../shared/services/publisher.service';
import { BookService } from './../../../../shared/services/book.service';
import { AuthorService } from './../../../../shared/services/author.service';
import { CategoryService } from './../../../../shared/services/category.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss'],
})
export class BookUpdateComponent implements OnInit {
  id: string;
  bookForm: FormGroup;
  loading = false;
  avatarUrl?: string;
  categories: ICategory[];
  authors: IAuthor[];
  publishers: IPublisher[];
  urlUpload: string = environment.apiUrl + 'upload/cloudinary-single-upload';

  constructor(
    private router$: Router,
    private activatedRoute$: ActivatedRoute,
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

    this.id = '';
    this.categories = [];
    this.authors = [];
    this.publishers = [];
  }

  ngOnInit(): void {
    this.id = this.activatedRoute$.snapshot.params['id'];
    this.bookService.select_id(this.id).subscribe((book) => {
      this.avatarUrl = book.image;
      this.bookForm.patchValue(book);
    });
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
      this.bookService
        .update({
          _id: this.id,
          ...this.bookForm.value,
        })
        .subscribe(
          () => {
            this.router$.navigateByUrl('/manager/books');
            this.message.success('Cập nhật thành công');
          },
          (error) => {
            this.message.error(error.error);
          }
        );
    }
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
        this.avatarUrl = this.bookForm.get('image')?.value;
        break;
    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
}
