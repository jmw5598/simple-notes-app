import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { RegistrationAccountFormComponent } from './registration-account-form.component';

describe('RegistrationAccountFormComponent', () => {
  let component: RegistrationAccountFormComponent;
  let fixture: ComponentFixture<RegistrationAccountFormComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);;
  let testFormGroup: FormGroup = new FormGroup({
    account: new FormGroup({
      plan: new FormControl('', [Validators.required])
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
