import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { RegistrationUserFormComponent } from './registration-user-form.component';

describe('RegistrationUserFormComponent', () => {
  let component: RegistrationUserFormComponent;
  let fixture: ComponentFixture<RegistrationUserFormComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);;
  let testFormGroup: FormGroup = new FormGroup({
    user: new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
      ]),
      password: new FormControl('', [
        Validators.required, 
        Validators.minLength(8)
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
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
        RegistrationUserFormComponent
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
    fixture = TestBed.createComponent(RegistrationUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
