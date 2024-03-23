import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, Cost, Item } from 'src/app/shared/Models/basket';
import { CheckoutService } from '../checkout.service';
import { Login } from 'src/app/shared/Models/login';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit,OnDestroy {
  @ViewChild('paymentRef', { static: true }) payment!: ElementRef;
  basketService: BasketService = inject(BasketService);
  toast: ToastrService = inject(ToastrService);
  route: Router = inject(Router);
  checkout: CheckoutService = inject(CheckoutService);
  basket$: Observable<Basket>;
  basketCost$: Observable<Cost>;
  basketCost: Cost;
  basket: Basket;
  totalItems: Item[] = [];
  obj: any;
  form: any;


  ngOnInit(): void {
    this.form = localStorage.getItem('formData');
    if (this.form) {
      this.form = JSON.parse(this.form);
      console.log(this.form);
    }

    this.basket$ = this.basketService.basket$;
    this.basket$.subscribe((res: Basket) => {
      this.basket = res;
    });
    this.basketCost$ = this.basketService.basketCost$;
    this.basketCost$.subscribe((res: Cost) => {
      this.basketCost = res;
    });

    this.makeOrder();

    window.paypal
      .Buttons({
        style: {
          // layout: 'horizontal',
          // color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, action: any) => {
          return action.order.create({
            purchase_units: [
              {
                amount: {
                  value: '1',
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, action: any) => {
          return action.order.capture().then((details: any) => {
            if (details.status === 'COMPLETED') {
              this.obj = { ...this.obj, paymentID: details.id };
              this.checkout.createOrder(this.obj).subscribe({
                next: (res: any) => {
                  this.toast.success('Transaction succeded');
                  this.checkout.setOrderID(res.orderID);
                  this.route.navigateByUrl('checkout/success');
                },
                error: (err) => {
                  console.log(err.error);
                },
              });
            }
          });
        },
        onError: (error: any) => {
          this.toast.error('Transaction failed,Try again later');
        },
      })
      .render(this.payment.nativeElement);
  }
  makeOrder() {
    const loginData: Login = JSON.parse(localStorage.getItem('loginData'));

    this.basket.items.forEach((elm) => {
      this.totalItems.push(elm);
    });
    console.log(this.form);
    this.obj = {
      userID: loginData.userID,
      email: loginData.email,
      subTotal: this.basketCost.subTotal,
      shippingCost: this.basketCost.shipping,
      total: this.basketCost.total,
      ...this.form,
      orderProduct: this.totalItems,
    };
    console.log(this.obj);
  }
  ngOnDestroy(): void {
    localStorage.removeItem("formData");
    localStorage.removeItem("setView");
  }
}
