import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/auth`;
  private userLog = new BehaviorSubject<User>({
    id: '',
    email: '',
    password: '',
    name : '',
});
  userLog$ = this.userLog.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password})
    .pipe(
      // guarda el token en el LocalStorage utilizando el servicio de tokenService
      tap(response => this.tokenService.saveToken(response.access_token))
    )
    ;
  }

  // Al usar un interceptor para agregar el token a cualquier petición que se haga al backen,
  //  ya no necesitamos enviarselo como parametro ni enviarlo aca por el header
  profile(){
    return this.http.get<User>(`${this.apiUrl}/profile`,{
      //envio de token por el header
      // headers: { 'Authorization': `Bearer ${token}`},
    });
  }

  setUserLog(userLog : User){
    this.userLog.next(userLog)
  }
}
