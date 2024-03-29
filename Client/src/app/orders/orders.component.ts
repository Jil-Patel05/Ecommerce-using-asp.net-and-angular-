import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { OrdersService } from './orders.service';
import { Login } from '../shared/Models/login';
import { Orders } from '../shared/Models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit{
  orders: OrdersService = inject(OrdersService);
  data: Login;
  userOrders: Orders[];

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem("loginData"));
    this.orders.getOrdersByUserID(this.data.userID).subscribe({
      next: (res: Orders[]) => {
        this.userOrders = res;
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }
}
