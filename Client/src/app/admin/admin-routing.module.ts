import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {
            path: 'create-product',
            component: CreateProductComponent,
            pathMatch: 'full',
          },
          {
            path: 'edit-product/:id',
            component: EditProductComponent,
            pathMatch: 'full',
          },
          {
            path: 'all-products',
            component: AllProductsComponent,
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        pathMatch: 'full',
      },
      {
        path: 'edit-order/:id',
        component: EditOrderComponent,
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full',
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
