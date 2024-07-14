import {Component, inject} from '@angular/core';
import {IconButtonComponent} from "../components/icon-button/icon-button.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    IconButtonComponent,
    MatToolbarModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  layoutService = inject(LayoutService)
}
