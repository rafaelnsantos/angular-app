import {computed, inject, Injectable, signal} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {AuthComponent} from "./auth.component";
import {WebAuthnService} from "../../../../shared/services/webauthn/web-authn.service";
import {environment} from "../../../../environments/environment";

const httpOptions = {
  withCredentials: true,
};

@Injectable({
  providedIn: "root"
})
export class AuthService  {
  public readonly email = signal<string>("")
  public readonly isLogged = computed<boolean>(() => !!this.email());
  private webAuthnService = inject(WebAuthnService)

  dialogService = inject(MatDialog)
  http = inject(HttpClient)

  start(): void {
    this.http.get<{message: string} >(environment.api.url + "/auth/test", httpOptions).subscribe({
      next: value => {
        this.email.set(value.message)
        this.dialogService.closeAll()
      },
      error: () => {
        this.email.set('')
        this.dialogService.open(AuthComponent, {
          disableClose: false,
          maxWidth: '400px',
          width: '100%',
          autoFocus: true,
          hasBackdrop: true,
        })
      }
    })

  }

  public logout() {
    this.webAuthnService.logout().subscribe({
      error: () => this.start(),
      complete: () => this.start(),
      next: () => this.start(),
    })
  }

  register(username: string) {
    this.webAuthnService.register({
      username,
    }).subscribe({
      next: () => this.start()
    })
  }

  login(username: string) {
    this.webAuthnService.login({
      username,
    }).subscribe({
      next: () => this.start()
    })
  }
}
