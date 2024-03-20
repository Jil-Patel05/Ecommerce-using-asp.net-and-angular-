import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Address } from 'src/app/shared/Models/address';
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
  userData: Login;
  toast: ToastrService = inject(ToastrService);

  ngOnInit(): void {
    console.log(this.form.value);
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
      this.account.updateAdressById(
        this.form.get('orderAddress').value,
        loginData.userID
      ).subscribe({
        next: () => {
          this.toast.success("Your address is saved");
        },
        error: (err) => {
          console.log(err.error);
        }
      })
    }
  }
  proceedAddress() {
    if (this.form.get('orderAddress').invalid) {
      this.toast.error('plaese fill all required field properly');
    } else {
      this.checkout.setView(2);
    }
  }
}
