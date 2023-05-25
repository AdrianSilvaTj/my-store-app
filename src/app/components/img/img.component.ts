import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  @Input('img') // este sera el nombre que ira en el html
  // realizar alguna accion cuando cambie el valor de img
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img =>'), this.img;

    // code
  }

  @Output() loaded = new EventEmitter<string>();
  imageDefault = "./assets/images/NoImage.png";
  //counter = 0;
  // counterFn: number | undefined;

  constructor(){
    // before render
    // No async -- once time
    console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges) {
    // before - during render
    // changes inputs -- n time
    console.log('ngOnChanges', 'imgValue =>', this.img);
    // detectar cada cambio individualmente
    console.log('Changes',changes);

  }

  ngOnInit(){
    // before render
    // async, fetch -- once time
    // console.log('ngOnInit', 'imgValue =>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter');

    // }, 1000);
  }

  ngAfterViewInit(){
    // after render
    // handler children
    //console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // delete componet
    //console.log('ngOnDestroy');
    // elimina por completo el intervalo
    //window.clearInterval(this.counterFn);
  }


  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log hijo');
    this.loaded.emit(this.img);

  }
}
