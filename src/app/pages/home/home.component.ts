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
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  layoutService = inject(LayoutService)

  ngOnInit(): void {
    this.layoutService.title.set("MonxTech")
    this.layoutService.menuItems.set(MENU_ITEMS)
  }
}
