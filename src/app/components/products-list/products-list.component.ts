import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { switchMap, zip } from 'rxjs';

import { CreateProductDTO, Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  @Input() products: Product[] = [];
  myShoppingCart: Product[] = [];
  total = 0;
  today = new Date();
  date = new Date(2021, 1, 21);
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: '',
    },
  };

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }


  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id).subscribe({
      // manejo de errores
      next: (data) => {
        this.productChosen = data;
        this.toggleProductDetail();
        this.statusDetail = 'success';
      },
      error: (error) => {
        // window.alert(error);
        // this.statusDetail = 'error';
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok',
          timer: 2000,
          showClass: { popup: 'popup' },
        });
      },
    });
  }

  // Ejemplo para evitar el callback hell: Evitar esto:
  // this.productsService.getProduct(id)
  //   .subscribe(data => {
  //     const product = data;
  //     this.productsService.update(product.id, {title:'change'})
  //     .subscribe(rtaUpdate => {
  //       console.log(rtaUpdate);
  //     })
  //   })

  readAndUpdate(id: string): void {
    this.productsService
      .getProduct(id)
      .pipe(
        // switchMap, se utiliza cuando la siguiente petición depende de la anterior,
        // esta recibe la respuesta de la primera y la utiliza como parametro de la segunda
        switchMap((product) =>
          this.productsService.update(product.id, { title: 'change' })
        )
      )
      .subscribe((data) => {
        console.log(data);
      });
    // zip, se utiliza para hacer peticiones en paralelo, es decir que no depende unas de otras
    zip(
      this.productsService.getProduct(id),
      this.productsService.update(id, { title: 'nuevo' })
      // o lo definimos en el servicio
      // this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    ).subscribe((response) => {
      // leyendo las respuestas de las peticiones
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const read = response[0];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const update = response[1];
    });
  }


  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'New Product',
      description: 'New Product description bla bla bla',
      price: 45,
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      categoryId: '2',
    };
    this.productsService.create(product).subscribe((data) => {
      //agraga el producto en la primera posición
      this.products.unshift(data);
    });
  }

  onUpdateProduct() {
    const changes = {
      title: 'Update Product',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (product) => product.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  ondeleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (product) => product.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }


}
