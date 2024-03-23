import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ShopService } from './shop.service';
import { PaginationProducts, Product } from '../shared/Models/product';
import { Enum } from '../shared/Models/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') inpSearch: ElementRef;
  r: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  products: PaginationProducts;
  enums: Enum;
  shopService: ShopService = inject(ShopService);
  route: Router = inject(Router);
  show: boolean = false;
  brandID: number = null;
  typeID: number = null;
  sort: string = null;
  pageSize: number;
  count: number;
  pageNumber: number;
  page: number = 1;
  searchVal: string;

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.shopService.getProducts().subscribe({
      next: (res: PaginationProducts) => {
        this.products = res;
        this.pageSize = this.products.pageSize;
        this.count = this.products.count;
        this.pageNumber = this.products.pageNumber;
        this.getEnums();
        console.log(res);
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
  getEnums() {
    let p: any;
    this.shopService.getProductEnums().subscribe({
      next: (res: Enum) => {
        res.enumBrand = [
          { productBrandID: 0, brandName: 'All' },
          ...res.enumBrand,
        ];
        res.enumType = [{ productTypeID: 0, typeName: 'All' }, ...res.enumType];
        this.enums = res;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
  filterProducts() {
    this.show = !this.show;
  }
  goToProductDetails(id:number) {
    this.route.navigateByUrl("/shop/" + id);
  }
  getProductsWithConditions() {
    this.shopService
      .getProducts(
        this.sort,
        this.brandID,
        this.typeID,
        this.page,
        this.searchVal
      )
      .subscribe({
        next: (res: PaginationProducts) => {
          this.products = res;
          this.pageSize = this.products.pageSize;
          this.count = this.products.count;
          this.pageNumber = this.products.pageNumber;
          console.log(res);
        },
        error: (err) => {
          console.log(err.error);
        },
      });
  }
  searchItem() {
    this.page = 1;
    this.searchVal = this.inpSearch.nativeElement.value;
    this.getProductsWithConditions();
  }
  onSelectBrand(id: number) {
    this.page = 1;
    if (id >= 1) {
      this.brandID = id;
    } else {
      this.brandID = null;
    }
    this.getProductsWithConditions();
  }
  onSelectType(id: number) {
    this.page = 1;
    if (id >= 1) {
      this.typeID = id;
    } else {
      this.typeID = null;
    }
    this.getProductsWithConditions();
  }
  selectSort(id: number) {
    this.page = 1;
    if (id == 1) {
      this.sort = 'name';
    } else if (id == 3) {
      this.sort = 'priceAsc';
    } else {
      this.sort = 'priceDesc';
    }
    this.getProductsWithConditions();
  }
  counter(i: number) {
    return new Array(i);
  }
  incPage() {
    this.page++;
    if (this.page > this.count / this.pageSize)
      this.page = this.count / this.pageSize;
    else {
      this.getProductsWithConditions();
    }
  }
  dscPage() {
    this.page--;
    if (this.page <= 0) this.page = 1;
    else {
      this.getProductsWithConditions();
    }
  }
  setPage(i: number) {
    this.page = i;
    this.getProductsWithConditions();
  }
}
