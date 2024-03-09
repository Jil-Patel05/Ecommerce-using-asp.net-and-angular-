import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PaginationProducts, Product } from '../shared/Models/product';
import { Enum } from '../shared/Models/enums';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  http: HttpClient = inject(HttpClient);

  private getAllProduct: string =
    'https://localhost:7067/api/Product/getAllProducts';
  private getProductEnum: string =
    'https://localhost:7067/api/Product/getProductEnumData';
    private getProduct: string =
    'https://localhost:7067/api/Product/getProduct/';

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
          return res.body;
        })
      );
  }
  getSingleProduct(id: number) {
    var item: string = this.getProduct + id;
    console.log(item);
    return this.http.get<Product>(item);
  }
  getProductEnums() {
    return this.http.get<Enum>(this.getProductEnum);
  }
}
