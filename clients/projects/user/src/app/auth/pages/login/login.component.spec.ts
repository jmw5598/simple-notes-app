import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserCredentials } from '@sn/user/core/models';
import { loginUser } from '@sn/user/auth/store/actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const testStore = {
    select: (selector: any) => of(),
    dispatch: (action: any) => {}
  }

  const loginFormValue: UserCredentials = {
    username: 'username',
    password: 'password',
    rememberMe: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        LoginComponent
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loginUser action when submitForm is called', () => {
    spyOn(testStore, 'dispatch');
    component.submitForm(loginFormValue);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      loginUser({ credentials: loginFormValue})
    );
  });
});
