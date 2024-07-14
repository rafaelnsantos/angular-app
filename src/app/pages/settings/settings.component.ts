import {Component, inject, OnInit} from '@angular/core';
import {LayoutService} from "../../layout/layout.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  layoutService = inject(LayoutService)

  ngOnInit(): void {
    this.layoutService.title.set("Settings")
  }
}
