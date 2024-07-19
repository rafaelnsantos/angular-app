import {Component, inject} from '@angular/core';
import {LayoutService} from "../layout.service";
import {DimensionsService} from "../dimensions.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IconComponent} from "../components/icon/icon.component";

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    IconComponent
  ],
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.scss'
})
export class SidebarLeftComponent {
  layoutService = inject(LayoutService)
  dimensionsService = inject(DimensionsService)

  closeIfMobile() {
    if (this.dimensionsService.isMobile()) {
      this.layoutService.sidebarLeftOpen.set(false);
    }
  }
}
