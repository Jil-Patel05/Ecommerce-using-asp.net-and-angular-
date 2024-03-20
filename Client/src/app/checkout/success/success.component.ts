import { Component, OnInit, inject } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent  implements OnInit{
  checkout: CheckoutService = inject(CheckoutService);
  orderID: number;

  ngOnInit(): void {
    this.orderID = this.checkout.getorderID();
    console.log(this.orderID);
  }

}
