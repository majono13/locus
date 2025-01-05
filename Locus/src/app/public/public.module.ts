import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    CatalogComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
