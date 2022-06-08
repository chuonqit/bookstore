import { ICategory } from './../../../../shared/models/Category.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @Input('categories') categories: ICategory[] = [];
}
