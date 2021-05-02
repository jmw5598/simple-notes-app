import { createSelector } from '@ngrx/store';
import * as fromDocuments from '../reducers/documents.reducers';
import * as fromApplication from '../../../../store/index';
import { Document } from '@sn/shared/models';

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

export const selectSearchTopicsResult = createSelector(
  selectDocumentState,
  (state: fromDocuments.IDocumentsState) => state.searchTopicsResult
);

export const selectSectionsForSelectedTopic = createSelector(
  selectDocumentState,
  (state: fromDocuments.IDocumentsState) => state.sectionsForSelectedTopic
);

export const selectDocumentBuilderDocument = createSelector(
  selectDocumentState,
  (state: fromDocuments.IDocumentsState) => ({
    ...state.documentBuilder,
    documentTopics: state.documentBuilder?.documentTopics.map(documentTopic => ({
      ...documentTopic
    }))
  } as Document)
);

export const selectDocumentBuilderSearchSelectedTopic = createSelector(
  selectDocumentState,
  (state: fromDocuments.IDocumentsState) => state.selectedDocumentTopic
);

export const selectDocumentMarkdownPreview = createSelector(
  selectDocumentState,
  (state: fromDocuments.IDocumentsState) => state.documentMarkdownPreview
);
