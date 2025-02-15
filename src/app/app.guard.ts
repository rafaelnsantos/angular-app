import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../shared/services/auth/auth.service";
import {PAGES} from "./pages";

export const appGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)

  if (authService.isLogged()) {
    return true
  }

  if (state.url) {
    authService.navigateTo.set(state.url)
  }

  router.navigate(PAGES.HOME_APP)
  return false;
};

