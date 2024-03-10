import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemsComponent } from './product-items/product-items.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { RatingModule } from "primeng/rating"; 
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';



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
    CarouselModule.forRoot()
  ],
})
export class ShopModule { }
