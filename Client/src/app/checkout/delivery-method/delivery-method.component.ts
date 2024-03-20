import { Component, Input, inject } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';
import { Delivery } from 'src/app/shared/Models/delivery';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-delivery-method',
  templateUrl: './delivery-method.component.html',
  styleUrls: ['./delivery-method.component.scss'],
})
export class DeliveryMethodComponent {
  checkout: CheckoutService = inject(CheckoutService);
  toast: ToastrService = inject(ToastrService);
  basket: BasketService = inject(BasketService);
  @Input() form: FormGroup;
  @Input() delivery: Delivery[];

  back() {
    this.checkout.setView(1);
  }
  proccedOrder() {
    if (this.form.invalid) {
      this.toast.error('please choose deliver method');
    } else {
      this.checkout.setView(3);
    }
  }

  func(id: number) {
    let shippingCost = this.delivery[id].price;
    this.basket.calculateCost(shippingCost);
  }
}
