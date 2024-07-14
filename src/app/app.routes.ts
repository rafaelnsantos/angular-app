import { Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {dashboardRoutes} from "./pages/dashboard.routes";

export const routes: Routes = [
  {
    path: 'app',
    component: LayoutComponent,
    children: dashboardRoutes
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: 'app',
  }
];
