import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PrimengModule } from '../../primeng.module';
import { SharedModule } from "../../shared.module";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PrimengModule,
        SharedModule,
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule { }
