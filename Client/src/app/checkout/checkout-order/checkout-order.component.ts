import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, Cost, Item } from 'src/app/shared/Models/basket';
import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';
import { Login } from 'src/app/shared/Models/login';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.scss'],
})
export class CheckoutOrderComponent implements OnInit {
  @Input() form: FormGroup;
  basketService: BasketService = inject(BasketService);
  checkout: CheckoutService = inject(CheckoutService);
  toast: ToastrService = inject(ToastrService);
  route: Router = inject(Router);
  basket$: Observable<Basket>;
  basketCost$: Observable<Cost>;
  basket: Basket;
  totalItems: Item[] = [];
  basketCost: Cost;
  obj: any;

  ngOnInit(): void {
    const data:any = localStorage.getItem('formData');
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
    }
    
    this.basket$ = this.basketService.basket$;
    this.basket$.subscribe((res: Basket) => {
      this.basket = res;
    });
    this.basketCost$ = this.basketService.basketCost$;
    this.basketCost$.subscribe((res: Cost) => {
      this.basketCost = res;
    });
  }

  back() {
    localStorage.setItem('setView', JSON.stringify(2));
    this.checkout.setView(2);
  }
  proceedPayment() {
    this.route.navigateByUrl('checkout/payment');
  }
}
