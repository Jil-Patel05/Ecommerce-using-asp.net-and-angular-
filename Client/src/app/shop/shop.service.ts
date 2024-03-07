import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { product } from '../shared/Models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  http: HttpClient = inject(HttpClient);

  private getAllProduct: string = "https://localhost:7067/api/Product/getAllProducts";

  getProducts() {
    return this.http.get<product[]>(this.getAllProduct+'?sort=priceDesc');
  }
}
