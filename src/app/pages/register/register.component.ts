import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink} from "@angular/router";
import {MatProgressBar} from "@angular/material/progress-bar";
import {LoadingService} from "../../../shared/services/loading/loading.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSidenavModule,
    RouterLink,
    MatProgressBar,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder)
  authService = inject(AuthService)
  loadingService = inject(LoadingService)

  readonly form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
  })

  onSubmit() {
    this.authService.register$(this.form.value.username!).subscribe()
  }
}
