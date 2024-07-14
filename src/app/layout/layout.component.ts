import {Component, inject} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import { LayoutService } from './layout.service';
import {MatProgressBar} from "@angular/material/progress-bar";
import {SidebarRightComponent} from "./sidebar-right/sidebar-right.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RouterOutlet,
    MatSidenavModule,
    MatProgressBar,
    SidebarRightComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  layoutService = inject(LayoutService)

  onBackdropClick() {
    this.layoutService.sidebarOpen.set(false)
    this.layoutService.sidebarRightOpen.set(false)
  }

  teste() {
    console.log(1)
  }
}
