import { PublisherService } from './../../../../shared/services/publisher.service';
import { AuthorService } from './../../../../shared/services/author.service';
import { IAuthor } from './../../../../shared/models/Auhor.model';
import { IPublisher } from './../../../../shared/models/Publisher.model';
import { CategoryService } from './../../../../shared/services/category.service';
import { ICategory } from './../../../../shared/models/Category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit {
  nameAscii: string;
  category: ICategory | null;
  filter: {
    publisher: string;
    author: string;
  };

  constructor(
    private title$: Title,
    private router$: Router,
    private activatedRoute$: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.nameAscii = '';
    this.category = null;
    this.router$.routeReuseStrategy.shouldReuseRoute = () => false;

    this.filter = {
      publisher: '',
      author: '',
    };
  }

  ngOnInit(): void {
    this.nameAscii = this.activatedRoute$.snapshot.params['nameAscii'];

    if (this.nameAscii) {
      this.categoryService
        .books_by_ascii(this.nameAscii)
        .subscribe((response) => {
          this.category = response.category;
          this.title$.setTitle('Thể loại: ' + response.category.name);
        });
    }
  }
}
