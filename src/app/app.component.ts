import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onImgLoaded(urlImg: string) {
    //console.log('log padre', urlImg);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

}
