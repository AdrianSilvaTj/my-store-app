import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter(){
    // obtiene el elemento que se quiere modificar y se le cambia el estilo
    this.element.nativeElement.style.backgroundColor = 'pink';
  }
  @HostListener('mouseleave') onMouseLeave(){
    // obtiene el elemento que se quiere modificar y se le cambia el estilo
    this.element.nativeElement.style.backgroundColor = 'lightblue';
  }

  constructor(
    private element: ElementRef
  ) {
    // obtiene el elemento que se quiere modificar y se le cambia el estilo
    this.element.nativeElement.style.backgroundColor = 'lightgreen';
  }

}
