import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

export function authGuard() {
  const route = inject(Router);
  const active = inject(ActivatedRoute);
  const account: AccountService = inject(AccountService);

  const userData = JSON.parse(localStorage.getItem('loginData'));

  let isLogged: boolean = false;
  console.log(userData);
  if (userData) {
     isLogged = !account.isAuthenticated(userData.token);
  }

  if (!isLogged) {
    route.navigate(['account/login'], { queryParams: { returnUrl :route.url} });
  }
  return isLogged;
}
