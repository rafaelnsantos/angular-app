import {Component, inject} from '@angular/core';
import { LayoutService } from '../layout.service';
import {ToggleMenuButtonComponent} from "../components/toggle-menu-button/toggle-menu-button.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    ToggleMenuButtonComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  layoutService = inject(LayoutService)
}
