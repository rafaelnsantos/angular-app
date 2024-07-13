import {Component, inject} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import { LayoutService } from './layout.service';
import {MatProgressBar} from "@angular/material/progress-bar";
import {LoadingService} from "../../shared/services/loading/loading.service";

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
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  layoutService = inject(LayoutService)
  loadingService = inject(LoadingService)
}
