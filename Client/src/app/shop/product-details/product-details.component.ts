import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/Models/product';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  shopService: ShopService = inject(ShopService);
  active: ActivatedRoute = inject(ActivatedRoute);
  bService: BreadcrumbService = inject(BreadcrumbService);
  productID: number;
  product: Product;
  cnt: number = 0;
  numberOfProduct: number = 0;
  constructor() {
    this.bService.set('@productDetails', '');
  }

  ngOnInit(): void {
    this.active.paramMap.subscribe((res) => {
      this.productID = +res.get('id');
    });
    this.shopService
      .getSingleProduct(this.productID)
      .subscribe((res: Product) => {
        this.product = res;
        this.numberOfProduct = this.product.numberOfProduct;
        this.bService.set('@productDetails', this.product.productName);
      });
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
}
