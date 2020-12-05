import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import { ResponseMessage, Page } from '@sn/core/models';
import { Topic, Document } from '@sn/shared/models';

export const documentsFeatureKey = 'documents'

export interface IDocumentsState {
  selectedDocument: Document,
  createDocumentResponseMessage: ResponseMessage,
  updateDocumentResponseMessage: ResponseMessage,
  searchDocumentsResult: Page<Document>,
  searchDocumentsSelection: Document,
  searchTopicsResult: Page<Topic>,
  selectedTopic: Topic
}

export const initialDocumentState: IDocumentsState = {
  selectedDocument: null,
  createDocumentResponseMessage: null,
  updateDocumentResponseMessage: null,
  searchDocumentsResult: null,
  searchDocumentsSelection: null,
  searchTopicsResult: null,
  selectedTopic: null
};

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
  }),
  on(fromActions.searchTopicsResult, (state, { page }) => {
    return {
      ...state,
      searchTopicsResult: page
    }
  }),
  on(fromActions.setSearchTopicsSelection, (state, { topic }) => {
    return {
      ...state,
      selectedTopic: topic
    }
  })
);

export function documentReducer(state, action) {
  return _documentReducer(state, action);
}
