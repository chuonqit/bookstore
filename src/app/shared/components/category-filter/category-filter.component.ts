import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IAuthor } from '../../models/Auhor.model';
import { IPublisher } from '../../models/Publisher.model';
import { AuthorService } from '../../services/author.service';
import { PublisherService } from '../../services/publisher.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent implements OnInit {
  publishers: IPublisher[];
  authors: IAuthor[];
  params: {
    publisher: string;
    author: string;
  };

  @Output() filter: EventEmitter<{
    publisher: string;
    author: string;
  }>;

  constructor(
    private authorService: AuthorService,
    private publisherService: PublisherService
  ) {
    this.publishers = [];
    this.authors = [];
    this.params = {
      author: '',
      publisher: '',
    };
    this.filter = new EventEmitter();
  }

  fillterPublisher(id: string) {
    this.params = {
      author: '',
      publisher: id,
    };
    this.filter.emit(this.params);
  }

  fillterAuthor(id: string) {
    this.params = {
      publisher: '',
      author: id,
    };
    this.filter.emit(this.params);
  }

  ngOnInit(): void {
    this.authorService.list_active().subscribe((response) => {
      this.authors = response;
    });

    this.publisherService.list_active().subscribe((response) => {
      this.publishers = response;
    });
  }
}
