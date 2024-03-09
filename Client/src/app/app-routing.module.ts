import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundErrorComponent } from './core/not-found-error/not-found-error.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb:'Home' } },
  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((mod) => mod.ShopModule),
      data: { breadcrumb:'Shop' }
  },
  { path: 'server-error', component: ServerErrorComponent, pathMatch: 'full',data: { breadcrumb:'Server error' } },
  {
    path: 'not-found-error',
    component: NotFoundErrorComponent,
    pathMatch: 'full',
    data: { breadcrumb:'Not found error' }
  },
  { path: 'contact', component: ContactComponent, pathMatch: 'full',data: { breadcrumb:'Contact' } },
  { path: 'about', component: AboutComponent, pathMatch: 'full',data: { breadcrumb:'About' } },
  { path: '**', component: HomeComponent, pathMatch: 'full',data: { breadcrumb:'Page Not found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
