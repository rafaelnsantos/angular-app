import {Component, inject} from '@angular/core';
import {LayoutService} from "../layout.service";
import {MatIconModule} from "@angular/material/icon";
import {ToggleSidebarButtonComponent} from "../components/toggle-sidebar-button/toggle-sidebar-button.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ButtonModule} from "primeng/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoadingService} from "../../../shared/services/loading/loading.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    ToggleSidebarButtonComponent,
    MatProgressBarModule,
    ButtonModule,
    MatToolbarModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  layoutService = inject(LayoutService)
  loadingService = inject(LoadingService)

}
