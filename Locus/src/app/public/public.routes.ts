import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthComponent } from './auth/auth.component';
import { LoginGuardService } from '../core/guards/LoginGuard.service';
import { AuthGuardService } from '../core/guards/AuthGuard.service';

export const routes: Routes = [
  { path: '', component:  CatalogComponent},
  { path: 'login', canActivate: [LoginGuardService], component: AuthComponent },
  { path: 'commun', canActivate: [AuthGuardService], loadChildren: () => import('./user-commun/user-commum.routes').then(r => r.routes) }
];