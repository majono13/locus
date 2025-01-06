import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [
    CatalogComponent,
    RegisterComponent,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
