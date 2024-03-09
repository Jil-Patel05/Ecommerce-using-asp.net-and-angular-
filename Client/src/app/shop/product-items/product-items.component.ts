import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/Models/product';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.scss']
})
export class ProductItemsComponent implements OnInit {
  p: any[] = [1, 2, 3, 4, 5, 6, 7, 8];
  @Input() product: Product;
  nm: string;
  
  ngOnInit(): void {
    this.nm = "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh";
  }
}
