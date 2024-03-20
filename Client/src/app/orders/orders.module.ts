import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleOrderComponent } from './single-order/single-order.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';



@NgModule({
  declarations: [
    SingleOrderComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
