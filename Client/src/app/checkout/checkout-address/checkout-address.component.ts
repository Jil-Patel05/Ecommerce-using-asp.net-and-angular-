import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { AccountService } from 'src/app/account/account.service';
import { Login } from 'src/app/shared/Models/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent implements OnInit {
  @Input() form: FormGroup;
  checkout: CheckoutService = inject(CheckoutService);
  account: AccountService = inject(AccountService);
  toast: ToastrService = inject(ToastrService);
  userData: Login;

  ngOnInit(): void {
    const data = localStorage.getItem('formData');
    if (data) {
      const formValue: any = JSON.parse(data);
      console.log(formValue);
      this.form.patchValue({
        deliveryID: null,
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

    if (this.form.value.orderAddress.zipCode == 0) {
      this.form.patchValue({
        orderAddress: {
          zipCode: null,
        },
      });
    }
  }
  saveAddress() {
    if (this.form.get('orderAddress').invalid) {
      this.toast.error('plaese fill all required field properly');
    } else {
      const loginData: Login = JSON.parse(localStorage.getItem('loginData'));
      this.account
        .updateAdressById(this.form.get('orderAddress').value, loginData.userID)
        .subscribe({
          next: () => {
            this.toast.success('Your address is saved');
          },
          error: (err) => {
            console.log(err.error);
          },
        });
    }
  }
  proceedAddress() {
    if (this.form.get('orderAddress').invalid) {
      this.toast.error('plaese fill all required field properly');
    } else {
      const data = localStorage.getItem('formData');
      if (data) {
        const formValue: any = JSON.parse(data);
        this.form.patchValue({
          deliveryID: formValue.deliveryID,
        });
      }
      localStorage.setItem('formData', JSON.stringify(this.form.value));
      localStorage.setItem('setView', JSON.stringify(2));
      this.checkout.setView(2);
    }
  }
}
