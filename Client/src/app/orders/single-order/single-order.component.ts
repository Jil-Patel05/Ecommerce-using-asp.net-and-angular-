import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';
import { OrderDetails } from 'src/app/shared/Models/orderDetails';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit {
  active: ActivatedRoute = inject(ActivatedRoute);
  bService: BreadcrumbService = inject(BreadcrumbService);
  orders: OrdersService = inject(OrdersService);
  orderID: number;
  orderDetails: OrderDetails;

  ngOnInit(): void {
    this.active.paramMap.subscribe((res) => {
      this.orderID = +res.get('id');
    });
    console.log(this.orderID);
    this.orders.getorderByOrderID(this.orderID).subscribe({
      next: (res:OrderDetails) => {
        this.orderDetails = res;
        console.log(res);
        this.bService.set('@orderDetails', 'Order#'+this.orderDetails[0].orderID +' - '+this.orderDetails[0].orderStatus);
      },
      error: (err) => {
        console.log(err.error);
      }
    })

    


  }
  
}
