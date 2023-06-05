import { Component, OnInit } from '@angular/core';
import { FilesService } from './services/files.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  imgParent = '';
  showImg = true;
  imgRta = '';

  constructor(
    private filesService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService,

    ) {}

  ngOnInit(): void {
    // Al comienzo de la aplicacion verifica si ya existe un token almacenado en el Local Storage
    // si es asi obtiene el perfil del usuario, esto sobre todo al recargar la pagina.
      if (this.tokenService.getToken()) {
        this.authService.profile().subscribe();
      }
  }

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
