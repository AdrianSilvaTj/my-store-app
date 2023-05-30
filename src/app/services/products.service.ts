import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { catchError, map, retry } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { zip } from 'rxjs';
//import { Observable} from 'rxjs';

// Sevicio para hacer peticiones a la API de FakeStore

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    if (limit !== undefined && offset !== undefined) {
      return this.http
        .get<Product[]>(`${this.apiUrl}`, {
          params: { limit, offset },
        })
        .pipe(
          // hace 3 intentos para conectarse
          retry(3),
          // El primer map, hace la transformación a la data que llega del Obsevable,
          // el segundo hace la transformación al array que esta dentro de esa data
          map((products) =>
            products.map((item) => {
              return {
                ...item,
                taxes: 0.19 * item.price,
              };
            })
          )
        );
    }
    // retorna todos los productos paginados, Product[], tipea lo que esperamos
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string) {
    // retorna un producto
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          throw new Error('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          throw new Error('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          throw new Error('No estas permitido');
        }
        throw new Error('Ups algo salio mal');
      })
    );
  }

  create(dto: CreateProductDTO) {
    // crear producto
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    // retorna un producto
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
      );
  }
}
