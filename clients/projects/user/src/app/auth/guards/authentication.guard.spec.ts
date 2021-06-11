import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';

import { AuthenticationGuard } from './authentication.guard';
import { Router } from '@angular/router';
import { IAuthenticationState } from '../store/reducers';
import { AuthenticatedStatus } from '@sn/user/core/enums';
import { take } from 'rxjs/operators';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  const testRouter = jasmine.createSpyObj('Router', ['navigate']);
  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { return this._data.next(action)}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        {
          provide: Router,
          useValue: testRouter
        }
      ]
    });
    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when authenticatedStatus is set to Authenticated', () => {
    const state: IAuthenticationState = {
      authenticatedStatus: AuthenticatedStatus.AUTHENTICATED
    } as IAuthenticationState;
    testStore.dispatch(state);
    guard.canActivate(null, null)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeTrue();
      });
  });

  it('should return false and call navigate to reroute to login', () => {
    const state: IAuthenticationState = {
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED
    } as IAuthenticationState;
    testStore.dispatch(state);
    guard.canActivate(null, null)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(testRouter.navigate).toHaveBeenCalledTimes(1);
        expect(canActivate).toBeFalse();
      });
  });
});
