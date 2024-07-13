import { Component, inject } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {LayoutService} from "../../layout.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-toggle-menu-button',
  standalone: true,
  imports: [
    ButtonModule,
    MatIconModule
  ],
  templateUrl: './toggle-menu-button.component.html',
  styleUrl: './toggle-menu-button.component.scss'
})
export class ToggleMenuButtonComponent {
  layoutService = inject(LayoutService)
}
