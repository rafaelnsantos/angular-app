import {Component, inject} from '@angular/core';
import {LayoutService} from "../layout.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatProgressBar} from "@angular/material/progress-bar";
import {LoadingService} from "../../../shared/services/loading/loading.service";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {
  ToggleSidebarButtonComponent
} from "../components/toggle-sidebar-button/toggle-sidebar-button.component";
import {AuthService} from "../../pages/auth/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatProgressBar,
    MatIconModule,
    MatButtonModule,
    ToggleSidebarButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  layout2Service = inject(LayoutService)
  loadingService = inject(LoadingService)
  authService = inject(AuthService)
}
