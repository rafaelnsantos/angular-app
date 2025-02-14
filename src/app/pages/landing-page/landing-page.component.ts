import {Component, inject} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterLink,
    MatButton
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  authService = inject(AuthService)

  handleLogin() {
    this.authService.login$('').subscribe()
  }
}
