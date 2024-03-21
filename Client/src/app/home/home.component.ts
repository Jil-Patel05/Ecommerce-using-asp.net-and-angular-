import { Component, OnInit, inject } from '@angular/core';
import { HomeProduct } from '../shared/Models/homeProduct';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shopService: ShopService = inject(ShopService);
  products: HomeProduct[];
  ratingValue: number;

  ngOnInit(): void {
    this.shopService.getHomeProduct().subscribe({
      next: (res: HomeProduct[]) => {
        this.products = res;
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }
}
