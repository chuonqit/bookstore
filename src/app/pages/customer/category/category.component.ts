import { IPublisher } from './../../../shared/models/Publisher.model';
import { PublisherService } from './../../../shared/services/publisher.service';
import { AuthorService } from './../../../shared/services/author.service';
import { IAuthor } from './../../../shared/models/Auhor.model';
import { ICategory } from './../../../shared/models/Category.model';
import { CategoryService } from './../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  publishers: IPublisher[];
  authors: IAuthor[];
  filter: {
    publisher: string;
    author: string;
  };

  constructor(private title$: Title) {
    this.publishers = [];
    this.authors = [];
    this.filter = {
      publisher: '',
      author: '',
    };
  }

  ngOnInit(): void {
    this.title$.setTitle('Thể loại');
  }
}
