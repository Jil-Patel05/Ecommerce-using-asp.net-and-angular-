import { Component, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { Observable } from 'rxjs';
import { Basket, Cost, Item } from '../shared/Models/basket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../shared/Models/address';
import { AccountService } from '../account/account.service';
import { CheckoutService } from './checkout.service';
import { Login } from '../shared/Models/login';
import { Delivery } from '../shared/Models/delivery';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  basketService: BasketService = inject(BasketService);
  acoount: AccountService = inject(AccountService);
  fs: FormBuilder = inject(FormBuilder);
  checkout: CheckoutService = inject(CheckoutService);
  account: AccountService = inject(AccountService);
  address$: Observable<Address>;
  basket$: Observable<Basket>;
  basketCost$: Observable<Cost>;
  view$: Observable<number>;
  userData: Login;
  basket: Basket;
  totalItems: Item[];
  form: FormGroup;
  adr: Address;
  delivery: Delivery[];

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketCost$ = this.basketService.basketCost$;
    this.address$ = this.acoount.address$;
    this.view$ = this.checkout.view$;

    const view = JSON.parse(localStorage.getItem('setView'));
    if (view) {
      this.checkout.setView(view);
    }

    this.userData = JSON.parse(localStorage.getItem('loginData'));
    this.account.getAddressByUserId(this.userData.userID).subscribe({
      next: () => {
        console.log('here is address');
      },
      error: (err) => {
        console.log(err.error);
      },
    });

    this.form = this.fs.group({
      deliveryID: ['', Validators.required],
      orderAddress: this.fs.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
      }),
    });

    this.address$.subscribe((res: Address) => {
      this.adr = res;
      const data = localStorage.getItem('formData');
      if (data) {
        const formValue: any = JSON.parse(data);
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
      } else if (this.adr !== null) {
        this.form.patchValue({
          orderAddress: {
            firstName: this.adr.firstName,
            lastName: this.adr.lastName,
            street: this.adr.street,
            city: this.adr.city,
            state: this.adr.state,
            zipCode: this.adr.zipCode,
          },
        });
      }
    });

    this.checkout.getDeliveryMethods().subscribe({
      next: (res: Delivery[]) => {
        this.delivery = res;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
