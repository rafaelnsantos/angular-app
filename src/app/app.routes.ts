import { Routes } from '@angular/router';
import {dashboardRoutes} from "./pages/dashboard.routes";
import {LayoutComponent} from "./layout/layout.component";
import {RegisterComponent} from "./pages/register/register.component";
import {appGuard} from "./app.guard";
import {registerGuard} from "./pages/register/register.guard";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [registerGuard]
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: dashboardRoutes,
    canActivate: [appGuard],
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: 'not-found',
  }
];
