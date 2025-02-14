import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {SharedTestingModule} from "../../../shared/shared-testing.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {of} from "rxjs";

describe('AuthComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>([
      'register$',
    ])

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, SharedTestingModule, HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authService}
      ]
    })
    .compileComponents();

    authService.register$.and.callFake(() => of())

    fixture = TestBed.createComponent(RegisterComponent);

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit signup form', () => {
    // Arrange
    component.form.controls.username.setValue('asd@asd.com');

    // Act
    component.onSubmit();

    // Assert
    expect(component.form.valid).toBeTrue();
  })

});
