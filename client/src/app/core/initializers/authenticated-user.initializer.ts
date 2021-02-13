import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthenticationService, DynamicThemeService } from '../services';
import { AuthenticatedUser } from '../models';
import { IApplicationState } from '@sn/application/store/index';
import * as fromAuthenticationActions from '@sn/auth/store/actions';
import * as fromAuthenticationSelectors from '@sn/auth/store/selectors';
import { DEFAULT_THEME_FILE } from '../defaults';

export function authenticatedUserInitializer(
    store: Store<IApplicationState>, 
    authenticationSerivce: AuthenticationService,
    themeService: DynamicThemeService) {
  
  themeService.loadStyle(DEFAULT_THEME_FILE);
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
