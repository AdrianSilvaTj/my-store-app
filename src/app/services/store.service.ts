import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = [];

  // REACTIVIDAD *************************************
  // transmitira los cambios
  private myCart = new BehaviorSubject<Product[]>([]);
  // escuchará activamente a los subscriptores
  myCart$ = this.myCart.asObservable();

  addProduct(product:Product){
    this.myShoppingCart.push(product);
    // transmitimos el array de productos a los subscritos
    this.myCart.next(this.myShoppingCart);
  }

  getTotal(){
    // sumar el total de los productos agregados
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

}
