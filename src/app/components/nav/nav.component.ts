import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from './../../services/auth.service';
import { UsersService } from './../../services/users.service';
import { User } from '../../models/user.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeSideMenu = false;
  counter = 0;
  profile: User | null = null;
  token = '';

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService
    ) {}

  ngOnInit(): void {
    // Se subscribe al observable de myCart, que envia un array de productos cuando se produce algun cambio en el,
    // luego asigna la longitud de este array a counter
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });

    // this.authService.userLog$.subscribe(user => {
    //   this.profile = user
    // })
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
    this.authService.login('adrian@mail.com', 'adrian1234')
    .pipe(
      switchMap((token) => {
        this.token = token.access_token;
        return this.authService.profile(token.access_token);
      })
    )
    .subscribe((user) => {
      console.log(user);
      this.profile = user;
      //this.authService.setUserLog(user)
    });
  }

  loginUser() {
    this.authService.login('adrian@mail.com', 'adrian1234').subscribe((rta) => {
      console.log(rta.access_token);
      this.token = rta.access_token;
    });
  }

  getProfile() {
    this.authService.profile(this.token).subscribe((profile) => {
      //console.log(profile);
      this.authService.setUserLog(profile)
    });
  }

}
