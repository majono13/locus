import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { CatalogComponent } from './catalog/catalog.component';

import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
    imports: [
    CommonModule,
    PublicRoutingModule,
    CatalogComponent,
    RegisterComponent,
    AuthComponent,
    LoginComponent
]
})
export class PublicModule { }
