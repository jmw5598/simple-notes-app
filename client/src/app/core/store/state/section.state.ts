import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { ResponseMessage } from '@sn/core/models';
import { Page } from '@sn/core/models';
import { Section } from '@sn/shared/models';

export interface ISectionState {
  selectedSection: Section,
  createSectionResponseMessage: ResponseMessage,
  updateSectionResponseMessage: ResponseMessage,
  updateSectionNotesResponseMessage: ResponseMessage,
  searchSectionsResult: Page<Section>
};

export const initialSectionState: ISectionState = {
  selectedSection: null,
  createSectionResponseMessage: null,
  updateSectionResponseMessage: null,
  updateSectionNotesResponseMessage: null,
  searchSectionsResult: null
};
