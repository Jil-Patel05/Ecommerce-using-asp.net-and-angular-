import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { Basket } from './shared/Models/basket';
import { AccountService } from './account/account.service';
import { Login } from './shared/Models/login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'Client';
  basketService: BasketService = inject(BasketService);
  account: AccountService = inject(AccountService);
  userData: Login;

  ngOnInit(): void {
    var data = localStorage.getItem('basket_id');
    if (data) {
      this.basketService.getBasket(data).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    }
    this.userData = JSON.parse(localStorage.getItem('loginData'));
    if (this.userData && this.account.isAuthenticated(this.userData.token)) {
      this.account.logout();
    }
    else if (this.userData) {
      this.account.setUser();
    }
  }
  ngOnDestroy(): void {
    localStorage.removeItem("formData");
    localStorage.removeItem("setView");
  }
}
