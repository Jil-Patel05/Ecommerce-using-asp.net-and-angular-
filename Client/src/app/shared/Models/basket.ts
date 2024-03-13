import { v4 as uuidv4 } from 'uuid';

export interface Basket {
  id: string;
  items: Item[];
}

export interface Item {
  productID: number;
  productName: string;
  price: number;
  numberOfProduct: number;
  productUrl: string;
  brandName: string;
  typeName: string;
}

export interface Cost{
  shipping: number;
  subTotal: number;
  total: number;
}

export class CustomerBasket implements Basket {
  id = uuidv4();
  items: Item[] = [];
}
