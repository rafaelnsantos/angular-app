import {Component, inject, OnInit} from '@angular/core';
import {WebAuthnService} from "../../../shared/services/webauthn/web-authn.service";
import {MatButton} from "@angular/material/button";
import {LayoutService} from "../../layout/layout.service";

const MENU_ITEMS = [
  {
    label: 'Home',
    icon: 'home',
    routerLink: 'home'
  },
  {
    label: 'Home',
    icon: 'home',
    routerLink: 'home'
  },
  {
    label: 'Home',
    icon: 'home',
    routerLink: 'home'
  },
];

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  layoutService = inject(LayoutService)
  webAuthnService = inject(WebAuthnService)

  email = ''

  ngOnInit(): void {
    this.layoutService.title.set("Settings")
    this.layoutService.menuItems.set(MENU_ITEMS)
  }

  login() {
    console.log('LOGIN')
    // const user = this.serverMockService.getUser(this.email);
    // this.webAuthnService.webAuthnLogin(user).subscribe({
    //   next: (response) => {
    //     alert('✅ Congrats! Authentication went fine!');
    //     console.log('SUCCESSFULLY GOT AN ASSERTION!', response);
    //   },
    //   error: (error) => {
    //     alert('🚫 Sorry :( Invalid credentials!');
    //     console.log('FAIL', error);
    //   }
    // })
  }

  register() {

  }
}
