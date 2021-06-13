import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { PasswordResetComponent } from './password-reset.component';
import { ActivatedRoute } from '@angular/router';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;

  const code = 'reset-token-code';

  const mockQueryParams = {
    code: code
  }

  const resetValue = {
    code: code,
    password: 'password123',
    passwordConfirm: 'password123',
  }

  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        PasswordResetComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        {
          provide: ActivatedRoute, 
          useValue: {
            queryParams: of(mockQueryParams)
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should produce a valid form when value is patch through', () => {
    component.form.patchValue({...resetValue});
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
  });

  it('should produce an invalid form when value is patch through', () => {
    component.form.patchValue({
      ...resetValue,
      passwordConfirm: 'password321' 
    });
    expect(component.form.valid).toBeFalse();
  });

  it('should dispatch passwordReset when onSubmit is called using query params code', () => {
    component.form.patchValue({
      password: resetValue.password,
      passwordConfirm: resetValue.passwordConfirm
    });
    expect(component.form.valid).toBeTrue();
    expect(component.form.value).toEqual(resetValue);
  });
});
