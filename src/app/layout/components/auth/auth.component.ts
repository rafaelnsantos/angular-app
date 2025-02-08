import {Component, computed, inject, signal} from '@angular/core';
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { WebAuthnService } from '../../../../shared/services/webauthn/web-authn.service';

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
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder)
  private readonly webAuthnService = inject(WebAuthnService)

  readonly isRegister = signal(false)

  readonly form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
  })

  onClickToggleSign() {
    this.isRegister.update(prev => !prev)
  }

  onSubmit() {
    if (this.isRegister()) {
      this.webAuthnService.register({
        username: this.form.value.username!,
      })
    } else {
      this.webAuthnService.login({
        username: this.form.value.username!,
      })
    }
  }
}
