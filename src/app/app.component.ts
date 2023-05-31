import { Component } from '@angular/core';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  imgRta = '';

  constructor(private filesService: FilesService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onImgLoaded(urlImg: string) {
    //console.log('log padre', urlImg);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  downloadPDF() {
    this.filesService.getFile(
      'myPdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf'
    ).subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      })
    }
  }

}
