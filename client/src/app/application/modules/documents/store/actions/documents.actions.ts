import { createAction, props } from '@ngrx/store';
import { Page, PageableSearch, ResponseMessage } from '@sn/core/models';
import { Document } from '@sn/shared/models';

export const createDocument = createAction(
  '[Document] Create Document',
  props<{ document: Document }>()
);

export const createDocumentSuccess = createAction(
  '[Document] Create Document Success',
  props<{ document: Document }>()
);

export const setCreateDocumentResponseMessage = createAction(
  '[Document] Set Create Document Response Message ',
  props<{ message: ResponseMessage }>()
);

export const updateDocument = createAction(
  '[Document] Update Document',
  props<{ id: number, document: Document }>()
);

export const updateDocumentSuccess = createAction(
  '[Document] Update Document Success',
  props<{ document: Document }>()
);

export const setSelectedDocument = createAction(
  '[Document] Selected Document',
  props<{ document: Document }>()
);

export const setUpdateDocumentResponseMessage = createAction(
  '[Document] Update Document Response Message',
  props<{ message: ResponseMessage }>()
);

// delete document
export const deleteDocument = createAction(
  '[Document] Delete Document',
  props<{ id: number }>()
);

export const deleteDocumentSuccess = createAction(
  '[Document] Delete Documnet Success',
  props<{ document: Document }>()
);

export const getDocumentById = createAction(
  '[Document] Get Document By Id',
  props<{ documentId: number }>()
);

export const getDocumentByIdSuccess = createAction(
  '[Document] Get Document By Id Succes',
  props<{ document: Document }>()
);

export const searchDocuments = createAction(
  '[Document] Search Documents',
  props<{ search: PageableSearch }>()
);

export const searchDocumentsResult = createAction(
  '[Document] Search Documents Result',
  props<{ page: Page<Document> }>()
);

export const setSearchDocumentsSelection = createAction(
  '[Document] Search Documents Selection',
  props<{ document: Document }>()
);
