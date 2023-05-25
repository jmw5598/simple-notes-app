import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ControlContainer, FormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AccountDetailsFormComponent } from './account-details-form.component';
import { buildProfileFormGroup } from '@sn/user/shared/forms/profile-form.builder';
import { AccountValidators } from '@sn/user/core/validators';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AccountDetailsFormComponent', () => {
  let component: AccountDetailsFormComponent;
  let fixture: ComponentFixture<AccountDetailsFormComponent>;

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
        NoopAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AccountDetailsFormComponent
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
    fixture = TestBed.createComponent(AccountDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
