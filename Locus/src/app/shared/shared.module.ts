import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './components/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidatorComponent } from './components/input-validator/input-validator.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccountComponent } from './components/account/account.component';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';


@NgModule({
  declarations: [
    InputValidatorComponent,
    HomeComponent,
    SidebarComponent,
    AccountComponent,
    GenericModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    InputValidatorComponent,
    HomeComponent,
    SidebarComponent,
    AccountComponent,
    GenericModalComponent
  ]
})
export class SharedModule { }
