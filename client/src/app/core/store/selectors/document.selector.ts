import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IDocumentState } from '../state/document.state';

export const selectDocumentState = createFeatureSelector<IDocumentState>('documents');

export const selectSelectedDocument = createSelector(
  selectDocumentState,
  (state: IDocumentState) => state.selectedDocument
);

export const selectCreateDocumentResponseMessage = createSelector(
  selectDocumentState,
  (state: IDocumentState) => state.createDocumentResponseMessage
);

export const selectUpdateDocumentResponseMessage = createSelector(
  selectDocumentState,
  (state: IDocumentState) => state.updateDocumentResponseMessage
);

export const selectSearchDocumentsResult = createSelector(
  selectDocumentState,
  (state: IDocumentState) => state.searchDocumentsResult
);

export const selectSearchDocumentsSelection = createSelector(
  selectDocumentState,
  (state: IDocumentState) => state.searchDocumentsSelection
);
