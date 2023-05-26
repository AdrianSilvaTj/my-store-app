import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  // value. parametro que recibimos
  transform(value: string): string {
    // convierte el estring en array, lo voltea y lo vuelve a convertir en string
    return value.split('').reverse().join('');
  }

}
