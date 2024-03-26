import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl = "https://localhost:7067";
  private userOrdersUrl: string = this.baseUrl + '/OrdereByUserID';
  private orderUrl: string = this.baseUrl+'/OrdereByOrderID';

  getOrdersByUserID(id: number) {
    return this.http.get(this.userOrdersUrl + '?userID=' +id,this.getHeaders());
  }

  getorderByOrderID(id: number) {
    return this.http.get(this.orderUrl + '?orderID=' +id,this.getHeaders());
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
