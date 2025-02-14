import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {SidebarLeftComponent} from "./sidebar-left/sidebar-left.component";
import {SidebarRightComponent} from "./sidebar-right/sidebar-right.component";
import {RouterOutlet} from "@angular/router";
import {LayoutService} from "./layout.service";
import {DimensionsService} from "./dimensions.service";
import {MatSidenavModule} from "@angular/material/sidenav";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    RouterOutlet,
    MatSidenavModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  layoutService = inject(LayoutService)
  dimensionsService = inject(DimensionsService)
}
