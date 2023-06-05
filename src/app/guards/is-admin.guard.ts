import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

export const isAdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.userLog$.subscribe(user => {
    console.log(user);

  })
  return authService.userLog$
  .pipe(
    map(user =>{
      if(user?.role === 'admin'){
        console.log('***** admin');
        return true;
      }
      console.log(user);
      router.navigate(['/home']);
      return false;
    })
  )
};
