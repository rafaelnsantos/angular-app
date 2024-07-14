import {Component, inject} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {Ripple} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LayoutService} from "../layout.service";
import {IconComponent} from "../components/icon/icon.component";

const MENU_ITEMS = [
  {
    label: 'Home',
    icon: 'home',
    routerLink: 'home'
  },
  {
    label: 'Settings',
    icon: 'settings',
    routerLink: 'settings'
  }
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    AvatarModule,
    Ripple,
    StyleClassModule,
    MatIcon,
    RouterLink,
    RouterLinkActive,
    IconComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = MENU_ITEMS;

  layoutService = inject(LayoutService)

  closeIfMobile() {
    if (this.layoutService.isMobile()) {
      this.layoutService.sidebarOpen.set(false);
    }
  }
}
