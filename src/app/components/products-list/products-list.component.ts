import { Component } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  products: Product[] = [
    {
      id: '0',
      name: 'Bateria',
      image: './assets/images/bateria.jpg',
      price: 500,
    },
    {
      id: '1',
      name: 'Celular',
      image: '../assets/images/celular.jpg',
      price: 100,
    },
    {
      id: '2',
      name: 'Bicicleta',
      image: '../assets/images/bici.jpg',
      price: 600,
    },
    {
      id: '3',
      name: 'Celular 2',
      image: '../assets/images/celular.jpg',
      price: 220,
    },
    {
      id: '4',
      name: 'Bateria 2',
      image: '../assets/images/bateria.jpg',
      price: 880,
    },
    {
      id: '5',
      name: 'Bicicleta 2',
      image: '../assets/images/bici.jpg',
      price: 450,
    },

  ];
}
