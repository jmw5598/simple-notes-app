import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationResult } from '@sn/user/core/dtos';

import { RegistrationResultComponent } from './registration-result.component';

describe('RegistrationResultComponent', () => {
  let component: RegistrationResultComponent;
  let fixture: ComponentFixture<RegistrationResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        RegistrationResultComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true when registration result is successful', () => {
    const registrationResult: RegistrationResult = {
      status: 'success',
      message: 'Registration was successfull'
    } as RegistrationResult;
    component.result = registrationResult;
    const isSuccess: boolean = component.isSuccess();
    expect(isSuccess).toBeTrue();
  });

  it('should return false when registration result is not successful', () => {
    const registrationResult: RegistrationResult = {
      status: 'failed',
      message: 'Registration failed'
    } as RegistrationResult;
    component.result = registrationResult;
    const isSuccess: boolean = component.isSuccess();
    expect(isSuccess).toBeFalse();
  });
});
