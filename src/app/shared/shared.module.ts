import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';

import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ImgComponent } from './components/img/img.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsListComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
  ],
  imports: [CommonModule, SwiperModule, RouterModule],
  exports: [
    ProductComponent,
    ProductsListComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
  ],
})
export class SharedModule {}
