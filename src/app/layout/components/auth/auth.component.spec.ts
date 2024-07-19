import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {SharedTestingModule} from "../../../../shared/shared-testing.module";

describe('SignupComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent, SharedTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);

    fixture.componentRef.setInput('isSignup', false);

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit signup form', () => {
    // Arrange
    fixture.componentRef.setInput('isSignup', true);
    component.form.controls.email.setValue('asd@asd.com');

    // Act
    component.onSubmit();

    // Assert
    expect(component.form.valid).toBeTrue();
  })

  it('should submit signin form', () => {
    // Arrange
    component.form.controls.email.setValue('asd@asd.com');

    // Act
    component.onSubmit();

    // Assert
    expect(component.form.valid).toBeTrue();
  })

  it('should not submit signup form', () => {
    // Arrange
    fixture.componentRef.setInput('isSignup', true);
    component.onSubmit();

    // Assert
    expect(component.form.valid).toBeFalse();
  })

});
