import {Component, inject, signal} from '@angular/core';
import { CommonModule } from "@angular/common";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {WebAuthnService} from "../../../../shared/services/webauthn/web-authn.service";

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
    RouterLink,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder)
  readonly webAuthnService = inject(WebAuthnService)

  readonly isRegister = signal(true)

  readonly form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  })

  onClickToggleSign() {
    this.isRegister.update(prev => !prev)
  }

  onSubmit() {
    const form = this.form

    if (!form.valid || !this.webAuthnService.isAvailable) {
      return
    }
    const user = { name: form.value.email!, displayName: form.value.email! }

    const test = this.isRegister() ?
      this.webAuthnService.register(user) :
      this.webAuthnService.login(user)

    test.subscribe({
      next: (response) => {
        console.log('response', response)
      },

      error: (error) => {
        console.error('error', error)
      }
    })
  }
}
