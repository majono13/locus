import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component:  CatalogComponent},
  { path: 'login', component: AuthComponent },
  { path: 'commun', loadChildren: () => import('./user-commun/user-commun.module').then(m => m.UserCommunModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
