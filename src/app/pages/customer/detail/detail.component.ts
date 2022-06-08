import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  nameAscii: string;
  quantity: number;

  constructor(private activatedRoute$: ActivatedRoute, private title$: Title) {
    this.nameAscii = '';
    this.quantity = 1;
  }

  ngOnInit(): void {
    this.nameAscii = this.activatedRoute$.snapshot.params['nameAscii'];
  }

  addToCart(quantity: number) {
    console.log(quantity);
  }
}
