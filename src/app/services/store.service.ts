import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = [];

  constructor() { }

  addProduct(product:Product){
    this.myShoppingCart.push(product);
  }

  getTotal(){
    // sumar el total de los productos agregados
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

}
