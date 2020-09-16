import { initialAuthenticationState, IAuthenticationState } from './authentication.state';
import { initialPlanState, IPlanState } from './plan.state';

export interface IAppState {  
  authentication: IAuthenticationState,
  plans: IPlanState,
}

export const initialAppState: IAppState = {
  authentication: initialAuthenticationState,
  plans: initialPlanState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
