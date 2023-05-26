import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from '../models/product.model';

// Sevicio para hacer peticiones a la API de FakeStore

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(){
    // retorna todos los productos, Product[], tipea lo que esperamos
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }
}
