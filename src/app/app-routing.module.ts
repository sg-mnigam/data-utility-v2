import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'okta', pathMatch: 'full'
  },
  {
    path: 'okta', loadChildren: () => import('./okta-module/okta.module').then(m => m.OktaModule)
  },
  // {
  //   path: 'login', loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  // },
  {
    path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
