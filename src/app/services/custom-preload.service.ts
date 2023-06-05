import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    // las rutas que tengan la clave preload, son las que se van a precargar
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }

}
