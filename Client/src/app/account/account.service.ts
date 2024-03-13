import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { Login } from '../shared/Models/login';
import { Address } from '../shared/Models/address';
import { isJwtExpired } from 'jwt-check-expiration';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http: HttpClient = inject(HttpClient);
  route: Router = inject(Router);

  private baseUrl = 'https://localhost:7067';
  private loginUrl = this.baseUrl + '/login';
  private RegisterUrl = this.baseUrl + '/register';
  private addressUrl = this.baseUrl + '/address';
  private addressUpdateUrl = this.baseUrl + '/addOrUpdateAddress';

  private currentUserSource: BehaviorSubject<Login> =
    new BehaviorSubject<Login>(null);
  currentUser$ = this.currentUserSource.asObservable();
  private addressSource: BehaviorSubject<Address> =
    new BehaviorSubject<Address>(null);
  address$ = this.addressSource.asObservable();

  login(values: any) {
    return this.http.post(this.loginUrl, values).pipe(
      map((res: Login) => {
        console.log(res);
        if (res) {
          localStorage.setItem('loginData', JSON.stringify(res));
          this.currentUserSource.next(res);
        }
      })
    );
  }

  isAuthenticated(token: string) {
    const match = isJwtExpired(token);
    return match;
  }

  register(values: any) {
    return this.http.post(this.RegisterUrl, values);
  }

  logout() {
    localStorage.removeItem('loginData');
    this.currentUserSource.next(null);
    this.route.navigateByUrl('/');
  }

  getAddressByUserId(id: number) {
    return this.http.get(this.loginUrl + '/' + id).pipe(
      map((res: Address) => {
        if (res) {
          this.addressSource.next(res);
        }
      })
    );
  }

  updateAdressById(value: any, id: number) {
    return this.http.post(this.loginUrl + '/' + id, value).pipe(
      map((res: Address) => {
        if (res) {
          this.addressSource.next(res);
        }
      })
    );
  }
}
