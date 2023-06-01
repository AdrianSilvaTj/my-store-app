import { Component, OnInit } from '@angular/core';
import { StoreService } from './../../../services/store.service';
import { AuthService } from './../../../services/auth.service';
import { UsersService } from './../../../services/users.service';
import { User } from './../../../models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeSideMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService,
    private categoriesService : CategoriesService
    ) {}

  ngOnInit(): void {
    // Se subscribe al observable de myCart, que envia un array de productos cuando se produce algun cambio en el,
    // luego asigna la longitud de este array a counter
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleSideMenu() {
    this.activeSideMenu = !this.activeSideMenu;
  }

  createUser() {
    this.usersService
      .create({
        password: 'adrian1234',
        email: 'adrian@mail.com',
        name: 'Adrian Silva',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  loginGetProfile(){
    this.authService.loginAndGet('adrian@mail.com', 'adrian1234')
    .subscribe((user) => {
      console.log(user);
      this.profile = user;
      //this.authService.setUserLog(user)
    });
  }

 getAllCategories(){
  this.categoriesService.getAll().subscribe((categories) => {
    this.categories = categories;
  })
 }

}
