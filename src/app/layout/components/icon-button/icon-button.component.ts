import {Component, input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [
    MatIconModule,
    ButtonModule
  ],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  icon = input('')
  label = input('')
}
