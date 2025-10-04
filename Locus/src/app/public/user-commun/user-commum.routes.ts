import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { PropertiesComponent } from './properties/properties.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'properties', component: PropertiesComponent }
];