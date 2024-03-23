import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'https://localhost:7067';
  private viewSource: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  view$ = this.viewSource.asObservable();
  orderID: number;
  setView(id: number) {
    this.viewSource.next(id);
  }

  createOrder(value:any) {
    return this.http.post(this.baseUrl + '/createOrder',value,this.getHeaders());
  }

  getOrderByOrderID(id: number) {
    return this.http.get(this.baseUrl + 'OrdereByOrderID?orderID=' + id,this.getHeaders());
  }

  getDeliveryMethods() {
    return this.http.get(this.baseUrl + '/DeliveryMethod',this.getHeaders());
  }

  setOrderID(orderID:number) {
    this.orderID = orderID;
  }
  getorderID() :number{
    return this.orderID;
  }
  getToken() {
    const data: any = JSON.parse(localStorage.getItem('loginData')).token;
    return data;
  }
  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
  }
}
