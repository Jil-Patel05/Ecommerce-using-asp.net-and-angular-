import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Enum } from '../shared/Models/enums';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  http: HttpClient = inject(HttpClient);

  private baseUrl = 'https://localhost:7067/api/admin';
  private getProductsUrl = this.baseUrl + '/getproducts';
  private getSingleProductUrl = this.baseUrl + '/getsingleproduct';
  private createProductUrl = this.baseUrl + '/createproduct';
  private deleteProductUrl = this.baseUrl + '/deleteproduct';
  private baseUrl2 = 'https://localhost:7067/api';
  private getProductEnum: string =
    this.baseUrl2 + '/Product/getProductEnumData';
  private editProductUrl: string = this.baseUrl + '/editproduct';

  getAdminProducts() {
    return this.http.get(this.getProductsUrl);
  }

  getAdminSingleProduct(id: number) {
    return this.http.get(this.getSingleProductUrl + '/' + id);
  }
  editAdminSingleProduct(value: any) {
    console.log(value);
    return this.http.post(this.editProductUrl,value);
  }

  createAdminProduct(value: any) {
    return this.http.post(this.createProductUrl, value);
  }

  deleteAdminProuct(id: number) {
    return this.http.get(this.deleteProductUrl + '/' + id);
  }
  getProductEnums() {
    return this.http.get<Enum>(this.getProductEnum);
  }
}
