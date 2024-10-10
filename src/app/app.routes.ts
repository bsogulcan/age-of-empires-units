import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { UnitListComponent } from './unit-list/unit-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'unit-list',
    component: UnitListComponent,
  },
  {
    path: 'unit/:id',
    component: UnitDetailComponent,
  },
];
