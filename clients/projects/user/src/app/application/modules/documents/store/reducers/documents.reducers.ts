import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import { ResponseMessage, Page } from '@sn/shared/models';
import { Topic, Document, Section, DocumentMarkdown, FileResponse, DocumentTopic } from '@sn/shared/models';

export const documentsFeatureKey = 'documents'

export interface IDocumentsState {
  selectedDocument: Document,
  createDocumentResponseMessage: ResponseMessage,
  updateDocumentResponseMessage: ResponseMessage,
  deleteDocumentResponseMessage: ResponseMessage,
  searchDocumentsResult: Page<Document>,
  searchDocumentsSelection: Document,
  searchTopicsResult: Page<Topic>,
  selectedDocumentTopic: DocumentTopic,
  sectionsForSelectedTopic: Section[],
  documentBuilder: Document,
  documentMarkdownPreview: DocumentMarkdown
  exportDocumentFileResponse: FileResponse,
  exportDocumentResponseMessage: ResponseMessage
}

export const initialDocumentBuilderState: Document = {
  id: -1,
  name: '',
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
  documentTopics: []
}

export const initialDocumentState: IDocumentsState = {
  selectedDocument: null,
  createDocumentResponseMessage: null,
  updateDocumentResponseMessage: null,
  deleteDocumentResponseMessage: null,
  searchDocumentsResult: null,
  searchDocumentsSelection: null,
  searchTopicsResult: null,
  selectedDocumentTopic: null,
  sectionsForSelectedTopic: null,
  documentBuilder: initialDocumentBuilderState,
  documentMarkdownPreview: null,
  exportDocumentFileResponse: null,
  exportDocumentResponseMessage: null
};

const onSetCreateDocumentResponseMessage = (state, { message} ) => ({
  ...state,
  createDocumentResponseMessage: message
});

const onSetUpdateDocumentResponseMessage = (state, { message }) => {
  console.log('update doc response message settign', message)
  return {
  ...state,
  updateDocumentResponseMessage: message
}};

const onSearchDocumentsResult = (state, { page }) => ({
  ...state,
  searchDocumentsResult: page
});

const onSetSearchDocumentSelection = (state, { document }) => ({
  ...state,
  searchDocumentsSelection: document
});

const onSearchTopicsResult = (state, { page }) => ({
  ...state,
  searchTopicsResult: page
});

const onSetBuilderSearchTopicSelection = (state, { documentTopic }) => ({
  ...state,
  selectedDocumentTopic: documentTopic
});

const onGetSectionsByTopicIdSuccess = (state, { sections }) => ({
  ...state,
  sectionsForSelectedTopic: sections
});

const onSetBuilderDocument = (state, { document }) => ({
  ...state,
  documentBuilder: document ? document : initialDocumentBuilderState
});

const onRemoveBuilderTopic = (state, { topicId }) => ({
  ...state,
  documentBuilder: {
    ...state.documentBuilder,
    documentTopics: state?.documentBuilder?.documentTopics
      ?.filter(documentTopic => documentTopic?.topic?.id !== topicId) || [],
  }
} as IDocumentsState);

const onRemoveBuilderSection = (state, { sectionId, topicId}) => ({
  ...state,
  documentBuilder: {
    ...state.documentBuilder,
    documentTopics: state.documentBuilder.documentTopics
      .map(documentTopic => {
        if (documentTopic?.topic?.id === topicId) {
          return {
            ...documentTopic,
            documentTopicSections: documentTopic?.documentTopicSections
              .filter(documentTopicSectin => documentTopicSectin?.section?.id !== sectionId)
          }
        } 
        return documentTopic
      })
  }
} as IDocumentsState);

const onSetBuilderTopics = (state, { documentTopics }) => ({
  ...state,
  documentBuilder: {
    ...state.documentBuilder,
    documentTopics: documentTopics
  }
});

const onSetBuilderTopicSections = (state, { topicId, documentTopicSections }) => ({
  ...state,
  documentBuilder: {
    ...state.documentBuilder,
    documentTopics: state.documentBuilder.documentTopics.map(documentTopic => {
      if (documentTopic?.topic?.id === topicId) {
        return {
          ...documentTopic,
          documentTopicSections: documentTopicSections
        }
      }
      return documentTopic;
    })
  }
});

const onGetDocumentByIdSuccess = (state, { document }) => ({
  ...state,
  documentBuilder: document
});

const onSetDocumentMarkdownPreview = (state, { documentMarkdown }) => ({
  ...state,
  documentMarkdownPreview: documentMarkdown
});

const onSetExportDocumentFileResponse = (state, { file }: any) => ({
  ...state,
  exportDocumentFileResponse: file
});

const onSetExportDocumentResponseMessage = (state, { message }: any) => ({
  ...state,
  exportDocumentResponseMessage: message
});

const onSetDeleteDocumentResponseMessage = (state, { message }: any) => ({
  ...state,
  deleteDocumentResponseMessage: message
});

const _documentReducer = createReducer(
  initialDocumentState,
  on(fromActions.setCreateDocumentResponseMessage, onSetCreateDocumentResponseMessage),
  on(fromActions.setUpdateDocumentResponseMessage, onSetUpdateDocumentResponseMessage),
  on(fromActions.searchDocumentsResult, onSearchDocumentsResult),
  on(fromActions.setSearchDocumentsSelection, onSetSearchDocumentSelection),
  on(fromActions.searchTopicsResult, onSearchTopicsResult),
  on(fromActions.setBuilderSearchTopicSelection, onSetBuilderSearchTopicSelection),
  on(fromActions.getSectionsByTopicIdSuccess, onGetSectionsByTopicIdSuccess),
  on(fromActions.removeBuilderTopic, onRemoveBuilderTopic),
  on(fromActions.removeBuilderSection, onRemoveBuilderSection),
  on(fromActions.setBuilderDocument, onSetBuilderDocument),
  on(fromActions.setBuilderTopics, onSetBuilderTopics),
  on(fromActions.setBuilderTopicSections, onSetBuilderTopicSections),
  on(fromActions.getDocumentByIdSuccess, onGetDocumentByIdSuccess),
  on(fromActions.setDocumentMarkdownPreview, onSetDocumentMarkdownPreview),
  on(fromActions.exportDocumentSuccess, onSetExportDocumentFileResponse),
  on(fromActions.setExportDocumentResponseMessage, onSetExportDocumentResponseMessage),
  on(fromActions.setDeleteDocumentResponseMessage, onSetDeleteDocumentResponseMessage),
);

export function documentReducer(state, action) {
  return _documentReducer(state, action);
}
