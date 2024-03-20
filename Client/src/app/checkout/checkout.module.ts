import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { DeliveryMethodComponent } from './delivery-method/delivery-method.component';
import { CheckoutOrderComponent } from './checkout-order/checkout-order.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutAddressComponent,
    DeliveryMethodComponent,
    CheckoutOrderComponent,
    CheckoutPaymentComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
