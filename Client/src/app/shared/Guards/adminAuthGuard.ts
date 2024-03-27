import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Login } from '../Models/login';

export function adminAuthGuard() {
  const route = inject(Router);
  const active = inject(ActivatedRoute);
  const account: AccountService = inject(AccountService);

  const userData: Login = JSON.parse(localStorage.getItem('loginData'));

  let isLogged: boolean = false;
  if (userData) {
    isLogged = !account.isAuthenticated(userData.token);
  }

  if (!isLogged) {
    route.navigate(['account/login'], {
      queryParams: { returnUrl: route.url },
    });
  }
  if (userData.role !== 'admin') {
    route.navigateByUrl('/');
  }
  return isLogged;
}
