import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuicklinkStrategy } from 'ngx-quicklink';

import { isAdminGuard } from './guards/is-admin.guard';
import { NotFoundComponent } from './not-found/not-found.component';
//import { CustomPreloadService } from './services/custom-preload.service';


const routes: Routes = [

  {
    // cargamos el routing de website, para el Lazy Loading
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    // data: {
    //   preload: true,
    // }
  },
  {
    // cargamos el routing de cms, para el Lazy Loading
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
    canActivate: [ isAdminGuard ],
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //preloadingStrategy: PreloadAllModules
    //preloadingStrategy: CustomPreloadService
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
