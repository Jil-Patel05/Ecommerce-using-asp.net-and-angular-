import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { authGuard } from './shared/Guards/authGuards';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((mod) => mod.ShopModule),
    data: { breadcrumb: 'Shop' },
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./basket/basket.module').then((mod) => mod.BasketModule),
    data: { breadcrumb: 'Basket' },
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
    data: { breadcrumb: 'Admin' },
    // canActivate: [authGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((mod) => mod.OrdersModule),
    data: { breadcrumb: 'Orders' },
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((mod) => mod.CheckoutModule),
    data: { breadcrumb: 'Checkout' },
    canActivate: [authGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((mod) => mod.AccountModule),
    data: { breadcrumb: { skip: true } },
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full',
    data: { breadcrumb: 'Contact' },
  },
  {
    path: '**',
    component: NotfoundComponent,
    pathMatch: 'full',
    data: { breadcrumb: 'Page Not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
