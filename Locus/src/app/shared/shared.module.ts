import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './components/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidatorComponent } from './components/input-validator/input-validator.component';


@NgModule({
  declarations: [
    InputValidatorComponent,
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
    InputValidatorComponent
  ]
})
export class SharedModule { }
