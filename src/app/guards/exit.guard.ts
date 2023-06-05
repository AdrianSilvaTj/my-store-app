import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

// Este guardian se utiliza para evitar que el usuario se salga de manera accidental o no durante un proceso que se realiza en determinada pagina,
// como por ejemplo al rellenar un formulario muy largo, o que tenga una carga de archivos muy pesados.

export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

// Se verifica que el component que ha implementado el guard tenga entre sus metodos, el metodo onExit(),
// definido en la interface, sino devuelve falso, es decir no deja salir al usuario
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exitGuard: CanDeactivateFn<any> = (component: OnExit) => {
  return component.onExit ? component.onExit() : false;
};
