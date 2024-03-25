import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { SuccessComponent } from './success/success.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';

const routes: Routes = [
  { path: '', component: CheckoutComponent,pathMatch:'full' },
  { path: 'success', component: SuccessComponent,pathMatch:'full' },
    { path: 'payment', component: CheckoutPaymentComponent,pathMatch:'full' },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CheckoutRoutingModule { }
