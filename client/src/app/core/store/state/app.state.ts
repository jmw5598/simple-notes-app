import { initialAuthenticationState, IAuthenticationState } from './authentication.state';
import { initialPlanState, IPlanState } from './plan.state';
import { initialSectionState, ISectionState } from './section.state';
import { initialTopicState, ITopicState } from './topic.state';
import { initialDocumentState, IDocumentState } from './document.state';

export interface IAppState {  
  authentication: IAuthenticationState,
  plans: IPlanState,
  sections: ISectionState,
  topics: ITopicState,
  documents: IDocumentState
}

export const initialAppState: IAppState = {
  authentication: initialAuthenticationState,
  plans: initialPlanState,
  sections: initialSectionState,
  topics: initialTopicState,
  documents: initialDocumentState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
