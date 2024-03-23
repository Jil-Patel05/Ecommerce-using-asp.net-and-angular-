import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PaginationProducts, Product } from '../shared/Models/product';
import { Enum } from '../shared/Models/enums';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  http: HttpClient = inject(HttpClient);
  private baseUrl = 'https://localhost:7067/api';

  private getAllProduct: string = this.baseUrl + '/Product/getAllProducts';
  private getProductEnum: string = this.baseUrl + '/Product/getProductEnumData';
  private getProduct: string = this.baseUrl + '/Product/getProduct/';
  private addReviewUrl: string = this.baseUrl + '/Product/addreviews';
  private getIntialProduct: string =
    this.baseUrl + '/Product/getinitialproduct';

  // products: Product[];

  getProducts(
    sort?: string,
    brandID?: number,
    typeID?: number,
    page?: number,
    search?: string
  ) {
    let params = new HttpParams();
    if (sort !== undefined && sort !== null) {
      params = params.append('sort', sort.toString());
    }
    if (brandID !== undefined && brandID !== null) {
      params = params.append('brandID', brandID.toString());
    }
    if (typeID !== undefined && typeID !== null) {
      params = params.append('typeID', typeID.toString());
    }
    if (page !== undefined && page !== null) {
      params = params.append('pageNumber', page.toString());
    }
    if (search !== undefined && search !== null) {
      params = params.append('search', search.toString());
    }
    return this.http
      .get<PaginationProducts>(this.getAllProduct, {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          // this.products = res.body.products;
          // console.log(res.body);
          return res.body;
        })
      );
  }
  getSingleProduct(id: number) {
    // const product = this.products.find(x => x.productID === id);
    // if (product) {
    //   return of(product);
    // }
    var item: string = this.getProduct + id;
    return this.http.get<Product>(item);
  }
  getProductEnums() {
    return this.http.get<Enum>(this.getProductEnum);
  }
  addReviews(val: any) {
    return this.http.post(this.addReviewUrl, val,this.getHeaders());
  }

  getHomeProduct() {
    return this.http.get(this.getIntialProduct);
  }
  getToken() {
    const data: any = JSON.parse(localStorage.getItem('loginData')).token;
    return data;
  }
  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
  }
}
