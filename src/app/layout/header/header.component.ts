import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {LayoutService} from "../layout.service";
import {MatIconModule} from "@angular/material/icon";
import {ToggleMenuButtonComponent} from "../components/toggle-menu-button/toggle-menu-button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    ToggleMenuButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  layoutService = inject(LayoutService)

  ref = inject(ElementRef)

  ngOnInit(): void {
    this.layoutService.headerRef.set(this.ref)
  }

}
