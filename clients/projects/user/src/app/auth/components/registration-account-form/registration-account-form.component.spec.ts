import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, UntypedFormControl, UntypedFormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { RegistrationAccountFormComponent } from './registration-account-form.component';

describe('RegistrationAccountFormComponent', () => {
  let component: RegistrationAccountFormComponent;
  let fixture: ComponentFixture<RegistrationAccountFormComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);;
  let testFormGroup: UntypedFormGroup = new UntypedFormGroup({
    account: new UntypedFormGroup({
      plan: new UntypedFormControl('', [Validators.required])
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
        RegistrationAccountFormComponent
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
    fixture = TestBed.createComponent(RegistrationAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
