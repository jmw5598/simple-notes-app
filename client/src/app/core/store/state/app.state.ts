import { initialAuthenticationState, IAuthenticationState } from './authentication.state';
import { ICalendarState, initialCalendarState } from './calendar.state';
import { initialPlanState, IPlanState } from './plan.state';
import { initialSectionState, ISectionState } from './section.state';
import { initialTopicState, ITopicState } from './topic.state';

export interface IAppState {  
  authentication: IAuthenticationState,
  plans: IPlanState,
  sections: ISectionState,
  topics: ITopicState,
  calendar: ICalendarState
}

export const initialAppState: IAppState = {
  authentication: initialAuthenticationState,
  plans: initialPlanState,
  sections: initialSectionState,
  topics: initialTopicState,
  calendar: initialCalendarState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
