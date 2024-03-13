import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketItemComponent } from './basket-item/basket-item.component';



@NgModule({
  declarations: [
    BasketComponent,
    BasketItemComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
  ]
})
export class BasketModule { }
