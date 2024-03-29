import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from "./products/create-product/create-product.component";
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';



@NgModule({
  declarations: [
    AdminComponent,
    ProductsComponent,
    CreateProductComponent,
    EditProductComponent,
    DashboardComponent,
    OrdersComponent,
    UsersComponent,
    AllProductsComponent,
    EditOrderComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
