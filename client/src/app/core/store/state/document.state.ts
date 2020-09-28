import { ResponseMessage } from '@sn/core/models';
import { Page } from '@sn/core/models'
import { Document, FileResponse } from '@sn/shared/models';

export interface IDocumentState {
  selectedDocument: Document,
  createDocumentResponseMessage: ResponseMessage,
  updateDocumentResponseMessage: ResponseMessage,
  searchDocumentsResult: Page<Document>,
  searchDocumentsSelection: Document
}

export const initialDocumentState: IDocumentState = {
  selectedDocument: null,
  createDocumentResponseMessage: null,
  updateDocumentResponseMessage: null,
  searchDocumentsResult: null,
  searchDocumentsSelection: null
};
