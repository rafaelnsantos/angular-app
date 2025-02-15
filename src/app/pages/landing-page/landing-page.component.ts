import {Component, inject, signal} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {MatProgressBar} from "@angular/material/progress-bar";
import {LoadingService} from "../../../shared/services/loading/loading.service";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterLink,
    MatButton,
    MatProgressBar
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  authService = inject(AuthService)
  loadingService = inject(LoadingService)

  handleLogin() {
    this.authService.login$('').subscribe()
  }
}
