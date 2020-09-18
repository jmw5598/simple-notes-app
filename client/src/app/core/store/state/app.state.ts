import { initialAuthenticationState, IAuthenticationState } from './authentication.state';
import { initialPlanState, IPlanState } from './plan.state';
import { initialTopicState, ITopicState } from './topic.state';

export interface IAppState {  
  authentication: IAuthenticationState,
  plans: IPlanState,
  topics: ITopicState
}

export const initialAppState: IAppState = {
  authentication: initialAuthenticationState,
  plans: initialPlanState,
  topics: initialTopicState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
