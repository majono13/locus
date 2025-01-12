import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from "primeng/tabview";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ToastModule,
    ConfirmDialogModule,
    MenuModule,
    DialogModule,
    TabViewModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    DividerModule,
    ToastModule,
    ConfirmDialogModule,
    MenuModule,
    DialogModule,
    TabViewModule
  ]
})
export class PrimengModule { }
