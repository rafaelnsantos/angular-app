import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {SharedTestingModule} from "../../../../shared/shared-testing.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {WebAuthnService} from "../../../../shared/services/webauthn/web-authn.service";

describe('SignupComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let webAuthnService: jasmine.SpyObj<WebAuthnService>;

  beforeEach(async () => {
    webAuthnService = jasmine.createSpyObj<WebAuthnService>([
      'register',
      'login'
    ])

    await TestBed.configureTestingModule({
      imports: [AuthComponent, SharedTestingModule, HttpClientTestingModule],
      providers: [
        {provide: WebAuthnService, useValue: webAuthnService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit signup form', () => {
    // Arrange
    component.isRegister.set(true);
    component.form.controls.username.setValue('asd@asd.com');

    // Act
    component.onSubmit();

    // Assert
    expect(component.form.valid).toBeTrue();
  })

  it('should submit signin form', () => {
    // Arrange
    component.form.controls.username.setValue('asd@asd.com');

    // Act
    component.onSubmit();

    // Assert
    expect(component.form.valid).toBeTrue();
  })

  it('should not submit signup form', () => {
    // Arrange
    component.isRegister.set(true);
    component.onSubmit();

    // Assert
    expect(component.form.valid).toBeFalse();
  })

});
