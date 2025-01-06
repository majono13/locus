import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ToastModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    DividerModule,
    ToastModule
  ]
})
export class PrimengModule { }
