import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../services';
import { AuthenticatedUser } from '../models';
import { IAppState } from '../store/state/app.state';
import * as fromAuthenticationActions from '@sn/auth/store/actions';
import * as fromAuthenticationSelectors from '@sn/auth/store/selectors';

export function authenticatedUserInitializer(
    store: Store<IAppState>, authenticationSerivce: AuthenticationService) {

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
