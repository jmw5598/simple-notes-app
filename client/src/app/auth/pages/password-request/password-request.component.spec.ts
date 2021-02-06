import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { PasswordRequestComponent } from './password-request.component';
import { PasswordRequestReset } from '@sn/core/models';
import { passwordRequestReset, passwordRequestResetResult } from '@sn/auth/store/actions';

describe('PasswordRequestComponent', () => {
  let component: PasswordRequestComponent;
  let fixture: ComponentFixture<PasswordRequestComponent>;
  const testStore = {
    select: (selector: any) => of(),
    dispatch: (action: any) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        PasswordRequestComponent
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
    fixture = TestBed.createComponent(PasswordRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch passwordRequestReset action when onSubmit is called', () => {
    const request: PasswordRequestReset = {
      email: 'email@email.com'
    };
    spyOn(testStore, 'dispatch');
    component.onSubmit(request);
    expect(testStore.dispatch).toHaveBeenCalledWith(passwordRequestReset({ request: request }));
  });

  it('should dispatch passwordRequestResetResult action when ngonDestroy is called', () => {
    spyOn(testStore, 'dispatch');
    component.ngOnDestroy();
    expect(testStore.dispatch).toHaveBeenCalledWith(passwordRequestResetResult({ result: null }));
  });
});
