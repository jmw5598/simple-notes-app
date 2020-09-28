import { createReducer, on } from '@ngrx/store';
import { initialDocumentState } from '../state/document.state';
import * as fromActions from '../actions';

const _documentReducer = createReducer(
  initialDocumentState,
  on(fromActions.setSelectedDocument, (state, { document }) => {
    return {
      ...state,
      selectedDocument: document
    }
  }),
  on(fromActions.setCreateDocumentResponseMessage, (state, { message} ) => {
    return {
      ...state,
      createDocumentResponseMessage: message
    }
  }),
  on(fromActions.setUpdateDocumentResponseMessage, (state, { message }) => {
    return {
      ...state,
      updateDocumentResponseMessage: message
    }
  }),
  on(fromActions.searchDocumentsResult, (state, { page }) => {
    return {
      ...state,
      searchDocumentsResult: page
    }
  }),
  on(fromActions.setSearchDocumentsSelection, (state, { document }) => {
    return {
      ...state,
      searchDocumentsSelection: document
    }
  })
);

export function documentReducer(state, action) {
  return _documentReducer(state, action);
}
