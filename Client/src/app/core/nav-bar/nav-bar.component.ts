import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/Models/basket';
import { isJwtExpired } from 'jwt-check-expiration';
import { AccountService } from 'src/app/account/account.service';
import { Login } from 'src/app/shared/Models/login';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basket$: Observable<Basket>;
  currentUser$: Observable<Login>;
  basketService: BasketService = inject(BasketService);
  account: AccountService = inject(AccountService);
  userData: any;
  firstName: string;
  displayLoginSign: boolean = true;
  show: boolean = false;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.account.currentUser$;
    this.currentUser$.subscribe((res) => {
      console.log(res);
    })
  }

  logout() {
    this.account.logout();
    this.displayLoginSign = true;
  }
  onBurgerMenu(){
    this.show = !this.show;
  }
}
