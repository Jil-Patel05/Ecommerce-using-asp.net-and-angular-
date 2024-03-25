import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SingleOrderComponent } from './single-order/single-order.component';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: ':id', component: SingleOrderComponent,data: { breadcrumb:{alias:'orderDetails'} },pathMatch:'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
