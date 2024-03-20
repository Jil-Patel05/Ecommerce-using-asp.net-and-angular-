import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl = "https://localhost:7067";
  private userOrdersUrl: string = this.baseUrl + '/OrdereByUserID';
  private orderUrl: string = 'https://localhost:7067/OrdereByOrderID';

  getOrdersByUserID(id: number) {
    return this.http.get(this.userOrdersUrl + '?userID=' +id);
  }

  getorderByOrderID(id: number) {
    console.log(id);
    return this.http.get(this.orderUrl + '?orderID=' +id);
  }
  

}
