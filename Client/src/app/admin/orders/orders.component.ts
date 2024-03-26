import { Component, OnInit, inject } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { AdminOrder } from 'src/app/shared/Models/adminOrder';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  admin: AdminServiceService = inject(AdminServiceService);
  orders: AdminOrder[];

  ngOnInit(): void {
    this.admin.getAllAdminOrders().subscribe({
      next: (res: AdminOrder[]) => {
        this.orders = res;
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }
}
