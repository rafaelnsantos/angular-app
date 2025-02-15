import { TestBed } from '@angular/core/testing';
import {CanActivateFn, Router} from '@angular/router';

import { appGuard } from './app.guard';
import {AuthService} from "../shared/services/auth/auth.service";
import {PAGES} from "./pages";

describe('appGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => appGuard({} as any, {} as any));

  let authService: jasmine.SpyObj<AuthService>
  let router: jasmine.SpyObj<Router>

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>([
      'isLogged',
    ])
    router = jasmine.createSpyObj<Router>([
      'navigate'
    ])

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true when logged in', () => {
    authService.isLogged.and.callFake(() => true)

    const res = executeGuard({} as any, {} as any)
    expect(res).toBeTrue()
  })

  it('should return false and navigate to login when not logged in', () => {
    authService.isLogged.and.callFake(() => false)

    const res = executeGuard({} as any, {} as any)
    expect(res).toBeFalse()
    expect(router.navigate).toHaveBeenCalledOnceWith(PAGES.HOME_APP)
  })
});
