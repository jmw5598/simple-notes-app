import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';
import { RegistrationStep } from './registration-step.enum';
import { RegistrationUserFormComponent } from '../../components/registration-user-form/registration-user-form.component';
import { RegistrationProfileFormComponent } from '../../components/registration-profile-form/registration-profile-form.component';
import { RegistrationAddressFormComponent } from '../../components/registration-address-form/registration-address-form.component';
import { RegistrationAccountFormComponent } from '../../components/registration-account-form/registration-account-form.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        RegisterComponent,
        RegistrationUserFormComponent,
        RegistrationProfileFormComponent,
        RegistrationAccountFormComponent,
        RegistrationAddressFormComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial step to RegistrationSetp.USER after component is initialized', () => {
    expect(component.currentStep).toEqual(0);
    expect(component.step).toEqual(RegistrationStep.USER);
  });

  it('should set step to RestigratvalueionStep.PROFLIE when next is called', () => {
    component.next();
    expect(component.currentStep).toEqual(1);
    expect(component.step).toEqual(RegistrationStep.PROFILE);
  });

  it('should set step to RegistrationStep.ACCOUNT when next is called twice', () => {
    component.next();
    component.next();
    expect(component.currentStep).toEqual(2);
    expect(component.step).toEqual(RegistrationStep.ACCOUNT);
  });

  it('should set step to RegistrationStep.FINISH when next is called three times', () => {
    component.next();
    component.next();
    component.next();
    expect(component.currentStep).toEqual(3);
    expect(component.step).toEqual(RegistrationStep.FINISH);
  });

  it('should set step to RegistrationStep.USER when next is called then pre is called', () => {
    component.next();
    component.pre();
    expect(component.currentStep).toEqual(0);
    expect(component.step).toEqual(RegistrationStep.USER);
  });

  it('should set step to RegistrationStep.FINISH when result is called', () => {
    component.result();
    expect(component.currentStep).toEqual(3);
    expect(component.step).toEqual(RegistrationStep.FINISH);
  });

  it('should set step to RegistrationStep.ERROR when current step is > 3 and changeContent is called', () => {
    component.currentStep = 4;
    component.changeContent();
    expect(component.step).toEqual(RegistrationStep.ERROR);
  });

  it('should set step to RegistrationStep.USER when reset is called with dirty steps', () => {
    component.next();
    component.next();
    component.reset();
    expect(component.currentStep).toEqual(0);
    expect(component.step).toEqual(RegistrationStep.USER);
  });
});
