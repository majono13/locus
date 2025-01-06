import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    DividerModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class PrimengModule { }
