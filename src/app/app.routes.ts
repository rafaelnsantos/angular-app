import { Routes } from '@angular/router';
import {dashboardRoutes} from "./pages/dashboard.routes";
import {LayoutComponent} from "./layout/layout.component";

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
