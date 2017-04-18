import {ProductClass} from '../../../models/product';

export interface CartEntity {

  quantity: number; // the number of instances the user wants to buy
  product: ProductClass; // the product related to this cart entry
  subTotal: string;
//  backorder: boolean;
} 