import { initialAuthenticationState, IAuthenticationState } from './authentication.state';
import { ICalendarEventState, initialCalendarEventState } from './calendar-event.state';
import { initialPlanState, IPlanState } from './plan.state';
import { initialSectionState, ISectionState } from './section.state';
import { initialTopicState, ITopicState } from './topic.state';

export interface IAppState {  
  authentication: IAuthenticationState,
  plans: IPlanState,
  sections: ISectionState,
  topics: ITopicState,
  calendar: ICalendarEventState
}

export const initialAppState: IAppState = {
  authentication: initialAuthenticationState,
  plans: initialPlanState,
  sections: initialSectionState,
  topics: initialTopicState,
  calendar: initialCalendarEventState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
