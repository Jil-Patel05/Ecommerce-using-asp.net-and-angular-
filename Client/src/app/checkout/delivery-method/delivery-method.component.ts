import { Component, Input, OnInit, inject } from '@angular/core';
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
export class DeliveryMethodComponent implements OnInit {
  checkout: CheckoutService = inject(CheckoutService);
  toast: ToastrService = inject(ToastrService);
  basket: BasketService = inject(BasketService);
  @Input() form: FormGroup;
  @Input() delivery: Delivery[];

  ngOnInit(): void {
    const data: any = localStorage.getItem('formData');
    if (data) {
      const formValue: any = JSON.parse(data);
      console.log(formValue);
      this.form.patchValue({
        deliveryID: formValue.deliveryID,
        orderAddress: {
          firstName: formValue.orderAddress.firstName,
          lastName: formValue.orderAddress.lastName,
          street: formValue.orderAddress.street,
          city: formValue.orderAddress.city,
          state: formValue.orderAddress.state,
          zipCode: formValue.orderAddress.zipCode,
        },
      });
    }
  }

  back() {
    localStorage.setItem('setView', JSON.stringify(1));
    const data = localStorage.getItem('formData');
    if (data) {
      localStorage.removeItem('formData');
    }
    console.log(this.form.value);
    localStorage.setItem('formData', JSON.stringify(this.form.value));
    this.checkout.setView(1);
  }
  proccedOrder() {
    if (this.form.invalid) {
      this.toast.error('please choose deliver method');
    } else {
      const data = localStorage.getItem('formData');
      if (data) {
        localStorage.removeItem('formData');
      }
      localStorage.setItem('formData', JSON.stringify(this.form.value));
      localStorage.setItem('setView', JSON.stringify(3));
      this.checkout.setView(3);
    }
  }

  func(id: number) {
    let shippingCost = this.delivery[id].price;
    this.basket.calculateCost(shippingCost);
  }
}
