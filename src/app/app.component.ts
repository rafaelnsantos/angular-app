import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconRegistry} from "@angular/material/icon";
import {LayoutService} from "./layout/layout.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  matIconReg = inject(MatIconRegistry);
  layoutService = inject(LayoutService); // run constructor

  ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
