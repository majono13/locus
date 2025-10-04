import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCommunRoutingModule } from './user-commun-routing.module';
import { SharedModule } from 'primeng/api';
import { PropertiesComponent } from './properties/properties.component';


@NgModule({
    imports: [
        CommonModule,
        UserCommunRoutingModule,
        SharedModule,
        PropertiesComponent
    ]
})
export class UserCommunModule { }
