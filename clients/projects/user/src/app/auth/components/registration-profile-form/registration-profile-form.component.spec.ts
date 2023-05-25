import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, UntypedFormControl, UntypedFormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { RegistrationAddressFormComponent } from '../registration-address-form/registration-address-form.component';
import { RegistrationProfileFormComponent } from './registration-profile-form.component';

describe('RegistrationProfileFormComponent', () => {
  let component: RegistrationProfileFormComponent;
  let fixture: ComponentFixture<RegistrationProfileFormComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);;
  let testFormGroup: UntypedFormGroup = new UntypedFormGroup({
    profile: new UntypedFormGroup({
      firstName: new UntypedFormControl('', [Validators.required]),
      lastName: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required]),
      address: new UntypedFormGroup({
        street: new UntypedFormControl('', [Validators.required]),
        street2: new UntypedFormControl(''),
        city: new UntypedFormControl('', [Validators.required]),
        state: new UntypedFormControl('', [Validators.required]),
        zip: new UntypedFormControl('', [Validators.required])
      })
    })
  });
  testFormGroupDirective.form = testFormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ], 
      declarations: [
        RegistrationProfileFormComponent,
        RegistrationAddressFormComponent
      ],
      providers: [
        {
          provide: ControlContainer, 
          useValue: testFormGroupDirective
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
