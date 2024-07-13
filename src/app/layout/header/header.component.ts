import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {LayoutService} from "../layout.service";
import {MatIconModule} from "@angular/material/icon";
import {ToggleSidebarButtonComponent} from "../components/toggle-sidebar-button/toggle-sidebar-button.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    ToggleSidebarButtonComponent,
    MatProgressBarModule,
    ButtonModule
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
