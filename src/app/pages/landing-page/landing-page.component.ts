import {Component, inject, OnInit} from '@angular/core';
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
    MatProgressBar,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  slide = 0;

  getSlide() {
    return this.slides[this.slide]
  }

  getNext() {
    if (this.slide > this.slides.length - 2) {
      this.slide = 0;
    } else {
      this.slide++;
    }
  }

  getPrev() {
    if (this.slide < 1) {
      this.slide = this.slides.length - 1;
    } else {
      this.slide--;
    }
  }

  authService = inject(AuthService)
  loadingService = inject(LoadingService)

  slides = ['./assets/img/angular.jpg', './assets/img/react.jpg', './assets/img/vue.jpg']

  ngOnInit(): void {
    setInterval(() => {
      this.getNext()
    }, 4000)
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

  handleLogin() {
    this.authService.login$('').subscribe()
  }
}
