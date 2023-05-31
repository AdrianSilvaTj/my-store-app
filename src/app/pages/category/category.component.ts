import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService

  ){}

  ngOnInit(): void {
    // nos subscribimos a. paramMap y obtenemos el parametro id que viene en la url,
    // este debe ser igual al declarado en app-routing
    this.route.paramMap
    .pipe(
      switchMap(params =>{
        this.categoryId = params.get('id');
        if (this.categoryId){
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return [];
      })
    )
    .subscribe(data => {
      this.products = data;
    })
  }


  loadMore() {
    this.offset += this.limit;
    if (this.categoryId){
      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
      });
    }
  }

}
