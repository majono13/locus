import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule,
    PrimengModule
  ],
  exports: [
    NavbarModule,
    RouterModule,
    PrimengModule
  ]
})
export class SharedModule { }
