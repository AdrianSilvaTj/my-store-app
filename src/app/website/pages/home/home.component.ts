import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../services/products.service';
import { Product } from './../../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = data;
      });

    this.route.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
      //console.log(this.productId);

    })
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
