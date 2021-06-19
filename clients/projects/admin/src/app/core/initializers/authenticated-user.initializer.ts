import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { IApplicationState } from '@sn/user/application/store/index';
import * as fromAuthenticationActions from '@sn/user/auth/store/actions';
import * as fromAuthenticationSelectors from '@sn/user/auth/store/selectors';


import { AuthenticationService, DynamicThemeService } from '@sn/core/services';
import { AuthenticatedUser, Theme } from '@sn/shared/models';

export function authenticatedUserInitializer(
    store: Store<IApplicationState>, 
    authenticationSerivce: AuthenticationService) {
  
  const user: AuthenticatedUser = authenticationSerivce.getStoredAuthenticatedUser();

  return () => new Promise<boolean>(resolve => {
    if (user) {
      store.dispatch(fromAuthenticationActions.loginUserSuccess({ user: user }));
      store.dispatch(fromAuthenticationActions.refreshToken());
    } else {
      store.dispatch(fromAuthenticationActions.setAuthenticatedUser({ user: null }))
    }
    store.select(fromAuthenticationSelectors.selectAuthenticatedUser)
      .pipe(take(1))
      .subscribe(user => resolve(true))    
  });
};
