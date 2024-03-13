import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/Models/basket';
import { isJwtExpired } from 'jwt-check-expiration';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basket$: Observable<Basket>;
  basketService: BasketService = inject(BasketService);
  account: AccountService = inject(AccountService);
  userData: any;
  firstName: string;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.userData = JSON.parse(localStorage.getItem('loginData'));
    console.log(this.userData)
    console.log(this.account.isAuthenticated(this.userData.token))
    if (this.userData && !this.account.isAuthenticated(this.userData.token)) {
      const fullName: string[] = this.userData.displayName.split(' ');
      this.firstName = fullName[0];
    } else {
      localStorage.removeItem("loginData");
    }
  }
}
