import { createSelector } from '@ngrx/store';
import * as fromDocuments from '../reducers/documents.reducers';
import * as fromApplication from '../../../../store/index';

export const selectDocumentState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.documents
);

export const selectSelectedDocument = createSelector(
  selectDocumentState,
  (state: fromDocuments.IDocumentsState) => state.selectedDocument
);

export const selectCreateDocumentResponseMessage = createSelector(
  selectDocumentState,
  (state: fromDocuments.IDocumentsState) => state.createDocumentResponseMessage
);

export const selectUpdateDocumentResponseMessage = createSelector(
  selectDocumentState,
  (state: fromDocuments.IDocumentsState) => state.updateDocumentResponseMessage
);

export const selectSearchDocumentsResult = createSelector(
  selectDocumentState,
  (state: fromDocuments.IDocumentsState) => state.searchDocumentsResult
);

export const selectSearchDocumentsSelection = createSelector(
  selectDocumentState,
  (state: fromDocuments.IDocumentsState) => state.searchDocumentsSelection
);
