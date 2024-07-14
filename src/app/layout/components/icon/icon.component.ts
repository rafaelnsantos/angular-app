import {Component, computed, input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  fill = input(false)
  weight = input(200)

  variation = computed(() => `'FILL' ${this.fill() ? 1 : 0}, 'wght' ${this.weight()}`)
}
