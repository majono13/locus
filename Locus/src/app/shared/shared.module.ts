import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './components/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidatorComponent } from './components/input-validator/input-validator.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    InputValidatorComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavbarModule,
    RouterModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    InputValidatorComponent,
    HomeComponent
  ]
})
export class SharedModule { }
