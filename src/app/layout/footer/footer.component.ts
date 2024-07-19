import { Component, inject } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {IconButtonComponent} from "../components/icon-button/icon-button.component";
import {LayoutService} from "../layout.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatToolbar,
    IconButtonComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  layoutService = inject(LayoutService)

}
