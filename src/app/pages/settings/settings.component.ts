import {Component, inject, OnInit} from '@angular/core';
import {LayoutService} from "../../layout/layout.service";
import {HttpClient} from "@angular/common/http";

const httpOptions = {
  withCredentials: true,
};

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
  http = inject(HttpClient)
  email: { message: string } | null = null

  ngOnInit(): void {
    this.layoutService.title.set("Settings")
    this.layoutService.menuItems.set(MENU_ITEMS)


    this.http.get<{message: string} >("http://localhost:8080/auth/test", httpOptions).subscribe({
      next: value => {
        this.email = value;
        console.log(this.email)
      },
      error: console.error
    })
  }


}
