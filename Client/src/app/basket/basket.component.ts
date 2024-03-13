import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from './basket.service';
import { Basket, Cost, Item } from '../shared/Models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  basketService: BasketService = inject(BasketService);
  basket$: Observable<Basket>;
  basketCost$: Observable<Cost>;
  basket: Basket;
  totalItems: Item[];

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basket$.subscribe((res: Basket) => {
      this.basket = res;
      this.totalItems = res.items;
    });
    this.basketCost$ = this.basketService.basketCost$;
  }
  decreaseQuantity(item:Item) {
    this.basketService.Dcs(item);
  }
  increaseQuantity(item:Item) {
    this.basketService.Inc(item);
  }

}
