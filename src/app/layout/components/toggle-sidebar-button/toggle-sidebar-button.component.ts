import {Component, input, output} from '@angular/core';
import {ButtonModule} from "primeng/button";
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
  iconClose = input<string>('close')
  icon = input.required<string>()
  isOpen = input.required<boolean>()

  onButtonClick = output()
}
