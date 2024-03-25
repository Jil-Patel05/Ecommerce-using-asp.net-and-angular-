import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  cnt: number = 1;
  allProdcuts() {
    this.cnt = 1;
  }
  createProduct() {
    this.cnt = 2;
  }
}
