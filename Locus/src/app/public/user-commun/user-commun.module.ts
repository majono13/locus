import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCommunRoutingModule } from './user-commun-routing.module';
import { SharedModule } from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserCommunRoutingModule,
    SharedModule
  ]
})
export class UserCommunModule { }
