import { Component, OnInit, inject } from '@angular/core';
import { ShopService } from './shop.service';
import { product } from '../shared/Models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: product[];
  p: any[] = [1, 2, 3, 4, 5, 6, 7, 8];
  shopService: ShopService = inject(ShopService);
  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (res: product[]) => {
        this.products = res;
      },
      error: (err) => {
        console.log(err.message);
      }
     })
  }
}
