import { Component, inject } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {LayoutService} from "../../layout.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-toggle-sidebar-button',
  standalone: true,
  imports: [
    ButtonModule,
    MatIconModule
  ],
  templateUrl: './toggle-sidebar-button.component.html',
  styleUrl: './toggle-sidebar-button.component.scss'
})
export class ToggleSidebarButtonComponent {
  layoutService = inject(LayoutService)
}
