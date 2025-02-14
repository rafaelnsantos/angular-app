import {inject, Injectable, signal} from "@angular/core";
import {WebAuthnService} from "../../../shared/services/webauthn/web-authn.service";
import {Router} from "@angular/router";
import {PAGES} from "../../pages";
import {catchError, Observable, tap, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  webAuthnService = inject(WebAuthnService)
  private router = inject(Router)
  private snackBar = inject(MatSnackBar)

  readonly navigateTo = signal<string>('app/home')

  isLogged() {
    return !!sessionStorage.getItem('isLogged')
  }

  logout() {
    this.webAuthnService.logout().subscribe({
      error: () => this.onLogout(),
      complete: () => this.onLogout()
    })
  }

  private onLogout() {
    sessionStorage.removeItem('isLogged')
    this.router.navigate(PAGES.LANDING)
  }

  register$(username: string) {
    return this.addPipe(this.webAuthnService.register({
      username,
    }))
  }

  login$(username: string) {
    return this.addPipe(this.webAuthnService.login({
      username,
    }))
  }

  private addPipe(observable: Observable<any>) {
    return observable.pipe(
      tap(() => {
        this.goToApp()
      }),
      catchError((err, a) => {
        this.snackBar.open((err.message as string).substring(0, 56), 'X', {
          duration: 5000,
        })
        return throwError(() => err)
      })
    )
  }

  private goToApp() {
    sessionStorage.setItem('isLogged', 'true')
    this.router.navigate([this.navigateTo()])
  }
}
