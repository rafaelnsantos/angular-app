import { Routes } from '@angular/router';
import {dashboardRoutes} from "./pages/dashboard.routes";
import {LayoutComponent} from "./layout/layout.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {appGuard} from "./app.guard";
import {loginGuard} from "./login.guard";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: dashboardRoutes,
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
