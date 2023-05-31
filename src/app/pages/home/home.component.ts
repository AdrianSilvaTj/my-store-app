import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = data;
      });
  }

  loadMore() {
    this.offset += this.limit;
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
      });
  }

}
