import { Component, OnInit, inject } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { Basket } from './shared/Models/basket';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';
  basketService: BasketService = inject(BasketService);
 
  ngOnInit(): void {
    var data = localStorage.getItem('basket_id')
    if (data) {
      this.basketService.getBasket(data).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err.error);
        },
      })
    }
  }
}
