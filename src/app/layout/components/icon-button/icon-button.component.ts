import {Component, input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IconComponent} from "../icon/icon.component";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    IconComponent
  ],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  icon = input.required<string>()
  label = input.required<string>()
  href = input.required<string>()
}
