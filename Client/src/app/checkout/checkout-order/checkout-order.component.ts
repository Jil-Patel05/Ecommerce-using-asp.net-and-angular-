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
    this.basket$ = this.basketService.basket$;
    this.basket$.subscribe((res: Basket) => {
      this.basket = res;
    });
    this.basketCost$ = this.basketService.basketCost$;
    this.basketCost$.subscribe((res: Cost) => {
      this.basketCost = res;
    });

    const loginData: Login = JSON.parse(localStorage.getItem('loginData'));

    this.basket.items.forEach((elm) => {
      this.totalItems.push(elm);
    });
    this.obj = {
      userID: loginData.userID,
      email: loginData.email,
      subTotal: this.basketCost.subTotal,
      shippingCost: this.basketCost.shipping,
      total: this.basketCost.total,
      ...this.form.value,
      orderProduct: this.totalItems,
    };
    console.log(this.obj);
  }

  back() {
    this.checkout.setView(2);
  }
  proceedPayment() {
    this.checkout.createOrder(this.obj).subscribe({
      next: (res: any) => {
        this.checkout.setOrderID(res.orderID);
        this.route.navigateByUrl('checkout/success');
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
