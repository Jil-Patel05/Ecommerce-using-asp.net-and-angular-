export type OrderDetails = Detail[];

export interface Detail {
  orderID: number;
  productID:number,
  productUrl: string;
  productName: string;
  price: number;
  numberOfProducts: number;
  orderStatus: string;
  shippingCost: number;
  total: number;
  subTotal: number;
}
