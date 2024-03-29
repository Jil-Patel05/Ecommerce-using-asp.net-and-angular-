import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, Cost, CustomerBasket, Item } from '../shared/Models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/Models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  http: HttpClient = inject(HttpClient);
  private basketUrl: string = 'https://localhost:7067/api/Basket';
  private basketSource: BehaviorSubject<Basket> = new BehaviorSubject<Basket>(
    null
  );
  basket$ = this.basketSource.asObservable();

  private basketSourceCost: BehaviorSubject<Cost> = new BehaviorSubject<Cost>(
    null
  );
  basketCost$ = this.basketSourceCost.asObservable();

  getBasket(id: string) {
    return this.http.get<Basket>(this.basketUrl + '?basketID=' + id).pipe(
      map((res: Basket) => {
        this.basketSource.next(res);
        this.calculateCost();
      })
    );
  }

  setBasket(basket: Basket,shippingCost?:number) {
    return this.http.post(this.basketUrl, basket).subscribe({
      next: (res: Basket) => {
        this.basketSource.next(res);
        // this.basketSource.next(null);
        // this.dlt(basket);
        this.calculateCost(shippingCost);
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  getBasketCurrentValue() {
    return this.basketSource.value;
  }

  Inc(item: Item) {
    const basket = this.getBasketCurrentValue();
    const idx = basket.items.findIndex((x) => x.productID === item.productID);
    basket.items[idx].numberOfProduct++;
    this.setBasket(basket);
  }
  Dcs(item: Item) {
    const basket = this.getBasketCurrentValue();
    const idx = basket.items.findIndex((x) => x.productID === item.productID);
    if (basket.items[idx].numberOfProduct > 1) {
      basket.items[idx].numberOfProduct--;
      this.setBasket(basket);
    } else {
      this.rmv(item);
    }
  }
  rmv(item: Item) {
    const basket = this.getBasketCurrentValue();
    const idx = basket.items.findIndex((x) => x.productID === item.productID);
    if (idx>=0) {
      basket.items = basket.items.filter((i) => i.productID !== item.productID);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.dlt(basket);
      }
    }
    else {
      // this.rmv(item);
    }
  }
  dlt(basket: Basket) {
    return this.http.delete(this.basketUrl + '?basketID=' + basket.id).subscribe({
      next: (res) => {
      this.basketSource.next(null);
      this.basketSourceCost.next(null);
      localStorage.removeItem("basket_id");
      },
      error:(err) => {
      console.log(err.error);
    }})
  }

  calculateCost(shippingCost?:number) {
    const basket = this.getBasketCurrentValue();
    if (shippingCost === null || shippingCost===undefined) shippingCost = 0;
    const shipping = shippingCost;
    const subTotal = basket.items.reduce(
      (a, b) => b.price * b.numberOfProduct + a,
      0
    );
    const total = subTotal + shipping;
    this.basketSourceCost.next({ shipping, subTotal, total });
  }

  AddItemToBasket(item: Product, quantity = 1) {
    const itemToAdd: Item = this.mapProduct(item, quantity);
    const it = { ...itemToAdd, totalProducts: item.numberOfProduct };

    const basket = this.getBasketCurrentValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, quantity, itemToAdd);
    this.setBasket(basket);
  }
  addOrUpdateItem(items: Item[], quantity: number, itemToAdd: Item): Item[] {
    const idx: number = items.findIndex(
      (i) => i.productID == itemToAdd.productID
    );
    if (idx === -1) {
      itemToAdd.numberOfProduct = quantity;
      items.push(itemToAdd);
    } else {
      items[0].numberOfProduct += quantity;
    }
    return items;
  }
  createBasket(): CustomerBasket {
    const basket = new CustomerBasket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  mapProduct(item: Product, quantity: number): Item {
    return {
      productID: item.productID,
      productName: item.productName,
      price: item.price,
      numberOfProduct: item.numberOfProduct,
      productUrl: item.productUrl[0],
      brandName: item.brandName,
      typeName: item.typeName,
    };
  }
}
