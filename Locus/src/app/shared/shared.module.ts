import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './components/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidatorComponent } from './components/input-validator/input-validator.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    InputValidatorComponent,
    HomeComponent,
    SidebarComponent
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
    HomeComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
