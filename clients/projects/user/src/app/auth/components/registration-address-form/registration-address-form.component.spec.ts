import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, UntypedFormControl, UntypedFormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { RegistrationAddressFormComponent } from './registration-address-form.component';

describe('RegistrationAddressFormComponent', () => {
  let component: RegistrationAddressFormComponent;
  let fixture: ComponentFixture<RegistrationAddressFormComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);;
  let testFormGroup: UntypedFormGroup = new UntypedFormGroup({
    address: new UntypedFormGroup({
      street: new UntypedFormControl('', [Validators.required]),
      street2: new UntypedFormControl(''),
      city: new UntypedFormControl('', [Validators.required]),
      state: new UntypedFormControl('', [Validators.required]),
      zip: new UntypedFormControl('', [Validators.required])
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
    fixture = TestBed.createComponent(RegistrationAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
