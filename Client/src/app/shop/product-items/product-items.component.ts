import { Component, Input, OnInit, inject } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/Models/product';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.scss']
})
export class ProductItemsComponent implements OnInit {
  @Input() product: Product;
  basketService: BasketService = inject(BasketService);
  
  ngOnInit(): void {
  }

  addItem() {
    this.basketService.AddItemToBasket(this.product);
  }
}
