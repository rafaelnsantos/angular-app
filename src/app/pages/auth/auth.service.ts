import {inject, Injectable, signal} from "@angular/core";
import {WebAuthnService} from "../../../shared/services/webauthn/web-authn.service";
import {Router} from "@angular/router";
import {PAGES} from "../../pages";

@Injectable({
  providedIn: "root"
})
export class AuthService  {
  private webAuthnService = inject(WebAuthnService)
  private router = inject(Router)

  readonly navigateTo = signal<string>('app/home')

  isLogged() {
    return !!document.cookie.match(/^(.*;)?\s*quarkus-credential\s*=\s*[^;]+(.*)?$/)
  }

  logout() {
    this.webAuthnService.logout().subscribe({
      error: () => this.router.navigate(PAGES.LANDING),
      complete: () => this.router.navigate(PAGES.LANDING)
    })
  }

  register(username: string) {
    this.webAuthnService.register({
      username,
    }).subscribe(() => this.goToApp())
  }

  login(username: string) {
  this.webAuthnService.login({
      username,
    }).subscribe(() => this.goToApp())
  }

  private goToApp() {
    this.router.navigate([this.navigateTo()])
  }
}
