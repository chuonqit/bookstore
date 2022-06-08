import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  keyword: string;

  constructor(private activatedRoute$: ActivatedRoute, private title$: Title) {
    this.keyword = '';
  }

  ngOnInit(): void {
    this.keyword = this.activatedRoute$.snapshot.queryParams['q'];
    this.title$.setTitle('Tìm kiếm: ' + this.keyword);
  }
}
