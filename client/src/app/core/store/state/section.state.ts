import { Section } from '@sn/shared/models';

export interface ISectionState {
  selectedSection: Section
};

export const initialSectionState: ISectionState = {
  selectedSection: null
};
