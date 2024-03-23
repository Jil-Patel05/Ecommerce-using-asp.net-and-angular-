import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/Models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/shared/Models/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  shopService: ShopService = inject(ShopService);
  active: ActivatedRoute = inject(ActivatedRoute);
  bService: BreadcrumbService = inject(BreadcrumbService);
  basketService: BasketService = inject(BasketService);
  fs: FormBuilder = inject(FormBuilder);
  route: Router = inject(Router);
  toast: ToastrService = inject(ToastrService);
  form: FormGroup;
  productID: number;
  product: Product;
  cnt: number = 0;
  numberOfProduct: number = 0;
  clicked: boolean = false;
  value: number = 0;

  constructor() {
    this.bService.set('@productDetails', '');
  }

  ngOnInit(): void {
    this.form = this.fs.group({
      userReview: ['', Validators.required],
    })
    this.active.paramMap.subscribe((res) => {
      this.productID = +res.get('id');
    });
    this.getSingleProduct();
  }
  getSingleProduct() {
    this.shopService
    .getSingleProduct(this.productID)
    .subscribe((res: Product) => {
      this.product = res;
      this.numberOfProduct = this.product.numberOfProduct;
      this.bService.set('@productDetails', this.product.productName);
    });
  }
  addItem() {
    this.basketService.AddItemToBasket(this.product,this.cnt);
  }
  decreaseQuantity() {
    if (this.cnt <= 0) {
      this.cnt = 0;
    } else {
      this.cnt--;
    }
  }
  increaseQuantity() {
    if (this.cnt >= this.numberOfProduct) {
      this.cnt = this.numberOfProduct;
    } else {
      this.cnt++;
    }
  }
  reviewInputCard() {
    this.clicked = !this.clicked;
  }
  onSubmit() {
    const data: Login = JSON.parse(localStorage.getItem("loginData"));
    if (!data) {
      this.route.navigate(["account/login"],{ queryParams: { returnUrl :this.route.url} });
    }
    let obj = {
      ...this.form.value,
      userRating: this.value,
      userID: data.userID,
      productID: this.productID,
      userFullName:data.displayName
    }
    this.shopService.addReviews(obj).subscribe({
      next: (res: boolean) => {
        this.getSingleProduct();
        this.toast.success("Review Added");
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }
}
