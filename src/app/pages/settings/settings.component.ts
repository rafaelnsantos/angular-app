import {Component, inject, OnInit} from '@angular/core';
import {LayoutService} from "../../layout/layout.service";

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
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  layoutService = inject(LayoutService)

  ngOnInit(): void {
    this.layoutService.title.set("Settings")
    this.layoutService.menuItems.set(MENU_ITEMS)
  }


}
