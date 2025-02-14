import { Component } from '@angular/core';
import {MatSidenavContainer, MatSidenavContent, MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterLink
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
