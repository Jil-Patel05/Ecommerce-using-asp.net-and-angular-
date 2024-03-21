import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemsComponent } from './product-items/product-items.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';




@NgModule({
  declarations: [
    ShopComponent,
    ProductItemsComponent,
    PageHeaderComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    RatingModule,
    FormsModule,
    CarouselModule.forRoot(),
    RatingModule,
    ReactiveFormsModule
  ],
})
export class ShopModule { }
