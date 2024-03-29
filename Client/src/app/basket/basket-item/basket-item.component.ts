import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket, Cost, Item } from 'src/app/shared/Models/basket';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent implements OnInit {
  basketService: BasketService = inject(BasketService);

  @Input() basket: Observable<Basket>;
  @Input() ind: number;
  ngOnInit(): void {}
  removeItem(item: Item) {
    console.log(item);
    this.basketService.rmv(item);
  }
  // removeItem(item: Item) {
  //   this.basketService.rmv(item);
  // }
}
