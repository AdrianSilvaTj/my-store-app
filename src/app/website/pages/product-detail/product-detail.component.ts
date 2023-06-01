import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location

  ){}

  ngOnInit(): void {
    // nos subscribimos a. paramMap y obtenemos el parametro id que viene en la url,
    // este debe ser igual al declarado en app-routing
    this.route.paramMap
    .pipe(
      switchMap(params =>{
        this.productId = params.get('id');
        if (this.productId){
          return this.productsService.getProduct(this.productId)
        }
        return [null];
      })
    )
    .subscribe(data => {
      this.product = data;
    })
  }

  goToBack(){
    this.location.back();
  }

}
