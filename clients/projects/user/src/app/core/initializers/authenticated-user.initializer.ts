import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { IApplicationState } from '@sn/user/application/store/index';
import * as fromAuthenticationActions from '@sn/user/auth/store/actions';
import * as fromAuthenticationSelectors from '@sn/user/auth/store/selectors';
import { DEFAULT_THEME_FILE } from '../defaults';

import { AuthenticationService, DynamicThemeService } from '@sn/core/services';
import { AuthenticatedUser, Theme } from '@sn/shared/models';

export function authenticatedUserInitializer(
    store: Store<IApplicationState>, 
    authenticationSerivce: AuthenticationService,
    themeService: DynamicThemeService) {
  
  const user: AuthenticatedUser = authenticationSerivce.getStoredAuthenticatedUser();
  themeService.loadStyle(DEFAULT_THEME_FILE);

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
