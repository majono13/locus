import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicNavComponent } from './navbar/public-nav/public-nav.component';
import { AuthenticatedNavComponent } from './navbar/authenticated-nav/authenticated-nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    PublicNavComponent,
    AuthenticatedNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
