import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    category: '',
  };
  @Output() addedProduct = new EventEmitter<Product>();

  onAddToCart(){
    // emitimos el producto que se quiere agregar
    this.addedProduct.emit(this.product);
  }
}
